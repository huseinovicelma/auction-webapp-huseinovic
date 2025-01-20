const express = require("express");
const { xss } = require('express-xss-sanitizer');
const router = express.Router();
const db = require("../db/db.js");
const { updateExpiredAuctions, checkDate, formattedDate } = require('../utils/utils.js');

const verifyUser = (req, res, next) => {
    try {  
      if (req.session && req.session.user) {
        next();
      } else {
        return res.status(401).json({ msg: "Non sei autenticato." });
      }

    } catch (error) {
      res.status(500).json({ msg: "Errore interno del server." });
    }
};

  
router.get("/users", xss(), async (req, res) => {
    try {
        const { username, name, surname, id } = req.query; 
        const mongo = await db.connectToDatabase();

        let query = {};

        if (username) {
            query.username = username; 
        }
        if (name) {
            query.name = name; 
        }
        if (surname) {
            query.surname = surname; 
        }
        if (id) {
            query.id = parseInt(id); 
        }

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

router.get("/whoami", verifyUser, async (req, res) => {
    try {
      const id = req.session.user.id;
      const mongo = await db.connectToDatabase();
      const result = await mongo.collection("users").findOne({ id }, { projection: { password: 0 } });
  
      if (!result) {
        return res.status(404).json({ message: "Utente non trovato." });
      }
  
      res.json(result);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      res.status(500).json({ message: "Si è verificato un errore interno." });
    }
});
  

router.get("/users/:id", xss(), async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const mongo = await db.connectToDatabase();
        const result = await mongo.collection("users").findOne({ id }, { projection: { password: 0 } });

        if (!result) {
        return res.status(404).json({ message: "Utente non trovato." });
        }

        res.json(result);
    } catch (error) {
        console.error("Errore nella richiesta:", error);
        res.status(500).json({ message: "Si è verificato un errore interno." });
    }
});
  
router.get("/auctions", xss(), async (req, res) => {
    try {
        const { userId, category, assignedTo} = req.query;  
        await updateExpiredAuctions();
        const mongo = await db.connectToDatabase();
        let query = {};  

        if (userId) {
            query.id_user = parseInt(userId);  
        }
        if (category) {
            query.category = category;  
        }
        if (assignedTo) {
            query.assignedTo = parseInt(assignedTo);  
        }

        const auctions = await mongo.collection("auctions").find(query).sort({ expired: 1, endDate: 1 }).toArray();  
        for (let auction of auctions) {
            auction.endDate = formattedDate(auction.endDate);
        };
        res.setHeader('Cache-Control', 'no-store');

        res.json(auctions); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore interno del server");
    }
});

router.post("/auctions", xss(), verifyUser, async (req, res) => {
    try {
        const { title, description, endDate, startingPrice } = req.body;
        if (startingPrice < 0){
            res.status(400).json({ msg: "Non è possibile inserire un valore negativo" });
        }
        if (checkDate(endDate)) {
            res.status(400).json({ msg: "Non è possibile inserire una data precedente a quella attuale!" });
        } else {
            const mongo = await db.connectToDatabase();
            const lastAuction = await mongo
                .collection("auctions")
                .findOne({}, { sort: {id: -1} });
            let id = lastAuction?.id !== undefined ? lastAuction.id : -1;
            id++;
            let id_user = req.session.user.id;
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

router.get("/auctions/:id", xss(), async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      await updateExpiredAuctions();
  
      const mongo = await db.connectToDatabase();
      const auction = await mongo.collection("auctions").findOne({ id });
  
      if (!auction) {
        return res.status(404).json({ msg: "Asta non trovata." });
      }
  
      auction.endDate = formattedDate(auction.endDate);
      res.json(auction);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      res.status(500).json({ message: "Si è verificato un errore interno." });
    }
});
  
router.put("/auctions/:id", xss(), verifyUser, async (req, res) => {
    try { 
        const id = parseInt(req.params.id);
        const userId = req.session.user.id; 
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

router.delete("/auctions/:id", xss(), verifyUser, async (req, res) => {
    let id = parseInt(req.params.id);
    let id_user = req.session.user.id;
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

router.get("/auctions/:id/bids", xss(), async (req, res) => {
    try {
      let auction_id = parseInt(req.params.id);
  
      const mongo = await db.connectToDatabase();
      const bids = await mongo.collection("bids").find({ auction_id }).toArray();
  
      if (bids.length === 0) {
        return res.status(404).json({ msg: "Nessuna offerta trovata per questa asta." });
      }
      for (let bid of bids) {
        bid.timestamp = formattedDate(bid.timestamp);
      }
  
      res.json(bids);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      res.status(500).json({ msg: "Si è verificato un errore interno." });
    }
  });
  
router.post("/auctions/:id/bids", xss(), verifyUser, async (req, res) => {
    await updateExpiredAuctions();
    try {
        const { bidAmount } = req.body;
        if (bidAmount < 0){
            return res.status(404).json({ msg: "L'offerta non può essere un numero negativo" });
        }
        const mongo = await db.connectToDatabase();
        const lastBid = await mongo
            .collection("bids")
            .findOne({}, { sort: {id: -1} });
        let id = lastBid?.id !== undefined ? lastBid.id : -1;
        id++;
        let id_user = req.session.user.id;
        let auction_id = parseInt(req.params.id);
        let timestamp = new Date();
        const newBid = {
            id,     
            auction_id,
            id_user,
            bidAmount,
            timestamp
          };
        
        const auction = await mongo
              .collection("auctions")
              .findOne({ id: auction_id });


        if(!auction.expired) {
            if (auction.currentPrice != 0){
                if (auction.currentPrice === auction.startingPrice && auction.id_user === auction.assignedTo
                    && auction.currentPrice === bidAmount){
                    await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {currentPrice: bidAmount}});
                    await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {assignedTo: id_user}});
                    await mongo.collection("bids").insertOne(newBid);
                    res.json({msg:"Offerta inserita con successo"});
                } else if (auction.currentPrice > bidAmount || auction.currentPrice === bidAmount){
                    return res.status(404).json({ msg: "L'offerta deve essere maggiore di quella corrente" });
                } else {
                    await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {currentPrice: bidAmount}});
                    await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {assignedTo: id_user}});
                    await mongo.collection("bids").insertOne(newBid);
                    res.json({msg:"Offerta inserita con successo"});
                }
            } else {
            }
        } else { 
            await mongo.collection("auctions").updateOne({id: auction_id}, {$set: {expired: true}})
            res.status(400).json({ msg: 'Non è possibile fare un\'offerta: l\'asta è scaduta' }); 
        }
    } catch (err) { 
        console.log(err);
        res.status(500).json({ msg: 'Errore durante l\'inserimento dell\'offerta' }); 
    }
});

router.get("/auctions/:id/bids", xss(), async (req, res) => {
    try {
      let auction_id = parseInt(req.params.id);
  
      const mongo = await db.connectToDatabase();
      const bids = await mongo.collection("bids").find({ auction_id }).toArray();
  
      if (bids.length === 0) {
        return res.status(404).json({ message: "Nessuna offerta trovata per questa asta." });
      }
  
      for (let bid of bids) {
        bid.timestamp = formattedDate(bid.timestamp);
      }
      res.json(bids);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      res.status(500).json({ message: "Si è verificato un errore interno." });
    }
});
  
router.get("/bids/:id", xss(), async (req, res) => {
    try {
      const bid_id = parseInt(req.params.id);
      const mongo = await db.connectToDatabase();
      const bid = await mongo.collection("bids").findOne({ id: bid_id });
  
      if (!bid) {
        return res.status(404).json({ message: "Offerta non trovata." });
      }
  
      bid.timestamp = formattedDate(bid.timestamp);
      res.json(bid);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      res.status(500).json({ message: "Si è verificato un errore interno." });
    }
});  

router.get('/checklogin', verifyUser, (req, res) => {
    res.status(200).json(req.session.user);
  });


module.exports = router;



