const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./db.js");
const { updateExpiredAuctions, checkDate } = require('./utils.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies["token"];
    if(!token){
        res.status(403).json({"msg": "Autenticazione fallita"});
        return;
    }
    try {
        // Verifica il token e decodifica se valido
        const secretKey = 'secret';
        const verified = jwt.verify(token, secretKey);
        req.userId = verified.id;
        console.log(verified);
        next();
      } catch (err) {
        console.error('Errore durante la decodifica/verifica del token:', err);
      }

};

router.get("/users", async (req, res) => {
    try {
        const { username, name, surname, id } = req.query; // Estrai i parametri di query
        const mongo = await db.connectToDatabase();

        // Crea un oggetto query vuoto per iniziare
        let query = {};

        // Aggiungi i filtri in base ai parametri di query, se presenti
        if (username) {
            query.username = username; // Filtra per username
        }
        if (name) {
            query.name = name; // Filtra per nome
        }
        if (surname) {
            query.surname = surname; // Filtra per cognome
        }
        if (id) {
            query.id = parseInt(id); // Filtra per cognome
        }

        // Esegui la query con il filtro e proietta il campo password per escluderlo
        const users = await mongo
            .collection("users")
            .find(query, { projection: { password: 0 } })
            .toArray();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore interno del server");
    }
});


router.get("/whoami", verifyToken, async (req, res) => {
    const id = req.userId;
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("users").findOne({id}, { projection: { password: 0 } });
    res.json(result);
});

router.get("/users/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("users").findOne({id}, { projection: { password: 0 } });
    res.json(result);
});

router.get("/auctions", async (req, res) => {
    try {
        const { userId, category, assignedTo} = req.query;  // Estrai i parametri di query dalla richiesta
        await updateExpiredAuctions();
        const mongo = await db.connectToDatabase();
        let query = {};  // Crea un oggetto query vuoto per iniziare

        // Aggiungi il filtro in base ai parametri di query, se presenti
        if (userId) {
            query.id_user = parseInt(userId);  // Filtra per id_user
        }
        if (category) {
            query.category = category;  // Filtra per categoria
        }
        if (assignedTo) {
            query.assignedTo = parseInt(assignedTo);  // Filtra per titolo (case-insensitive)
        }

        const auctions = await mongo.collection("auctions").find(query).toArray();  // Usa il filtro nella query
        res.json(auctions); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore interno del server");
    }
});

router.post("/auctions", verifyToken, async (req, res) => {
    try {
        const { title, description, endDate, startingPrice } = req.body;
        if (checkDate(endDate)) {
            res.status(400).json({ msg: "Non è possibile inserire una data precedente a quella attuale!" });
        } else {
            const mongo = await db.connectToDatabase();
            const lastAuction = await mongo
                .collection("auctions")
                .findOne({}, { sort: {id: -1} });
            let id = lastAuction?.id !== undefined ? lastAuction.id : -1;
            id++;
            let id_user = req.userId;
            const newAuction = { 
                id, 
                id_user, 
                title, 
                description, 
                endDate: new Date(endDate), 
                startingPrice,
                assignedTo: id_user,
                currentPrice: startingPrice,
                expired : false
            };
            await mongo.collection("auctions").insertOne(newAuction);
            res.json({ msg: 'Asta creata con successo' });
        }
        } catch (error) {
        res.status(500).json({ msg: "Internal error" });
    }
});

router.get("/auctions/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    await updateExpiredAuctions();
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("auctions").findOne({id});
    res.json(result);
});

router.put("/auctions/:id", verifyToken, async (req, res) => {
    try { 
        const id = parseInt(req.params.id);
        const userId = req.userId; 
        const { title, description } = req.body; 
        const mongo = await db.connectToDatabase(); 
        const auction = await mongo.collection('auctions').findOne({id});
        if (userId === auction.id_user) {
            const result = await mongo.collection('auctions').updateOne( {id}, 
                { $set: { title: title, description: description } } 
            ); 
            if (result.matchedCount === 0) 
                { return res.status(404).json({ error: 'Asta non trovata' }); 
            }
            res.json({ msg: 'Asta aggiornata con successo' }); 
        } else {
            res.json({ msg: 'Non puoi modificare un asta che non hai creato' }); 
        }
    } catch (err) { 
        res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'asta' }); }
});

router.delete("/auctions/:id", verifyToken, async (req, res) => {
    let id = parseInt(req.params.id);
    let id_user = req.userId;
    const mongo = await db.connectToDatabase();
    const auction = await mongo.collection("auctions").findOne({id});
    if(!auction) {
        return res.status(404).json({ error: 'Asta non trovata' });
    }

    if (auction.id_user === id_user) {
        if(!auction.expired) {
            const deleted_auction = await mongo.collection('auctions').deleteOne({id});
            if(deleted_auction.deletedCount === 1) {
                res.json({ msg: 'Asta cancellata con successo' });
            } else { 
                res.status(500).json({ error: 'Errore durante la cancellazione dell\'asta' }); 
            }
        } else { 
            res.status(400).json({ error: 'Non è possibile cancellare l\'asta se è già scaduta' }); 
        }
    } else {
        res.status(400).json({ error: 'Non è possibile cancellare l\'asta se non ne sei il proprietario' }); 
    }
});

router.get("/auctions/:id/bids", async (req, res) => {
    let auction_id = parseInt(req.params.id);
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("bids").find({auction_id}).toArray();
    res.json(result);
});

router.post("/auctions/:id/bids", verifyToken, async (req, res) => {
    try {
        const { bidAmount } = req.body;
        const mongo = await db.connectToDatabase();
        const lastBid = await mongo
            .collection("bids")
            .findOne({}, { sort: {id: -1} });
        console.log(lastBid);
        let id = lastBid?.id !== undefined ? lastBid.id : -1;
        id++;
        let id_user = req.userId;
        let auction_id = parseInt(req.params.id);
        let timestamp = new Date();
        const newBid = {
            id,      // ID unico dell'offerta
            auction_id,
            id_user,
            bidAmount,
            timestamp
          };
        
        await updateExpiredAuctions();
        
        const auction = await mongo
              .collection("auctions")
              .findOne({ id: auction_id });

        if(!auction.expired) {
            if (auction.currentPrice < bidAmount) {
                await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {currentPrice: bidAmount}});
                await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {assignedTo: id_user}});
                await mongo.collection("bids").insertOne(newBid);
                res.json({msg:"Offerta inserita con successo"});
            } else {
                res.status(400).json({ msg: 'Non è possibile fare un\'offerta inferiore a quella corrente '}); 
            }
        } else { 
            await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {expired: true}})
            res.status(400).json({ msg: 'Non è possibile fare un\'offerta: l\'asta è scaduta' }); 
        }
    } catch (err) { 
        console.log(err);
        res.status(500).json({ msg: 'Errore durante l\'inserimento dell\'offerta' }); }
});

router.get("/auctions/:id/bids", async (req, res) => {
    let auction_id = parseInt(req.params.id);
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("bids").find({auction_id}).toArray();
    res.json(result);
});

router.get("/bids/:id", async (req, res) => {
    const mongo = await db.connectToDatabase();
    const result = await mongo.collection("bids").findOne({id});
    res.json(result);
});

router.post('/checklogin', verifyToken, (req, res) => {
    // Questo codice verrà eseguito solo se il token è valido
    return res.status(200).json({ message: 'Token valido', userId: req.userId });
});


module.exports = router;



