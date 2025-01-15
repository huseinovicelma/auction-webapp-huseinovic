import { connectToDatabase } from "./db.js";

export async function updateExpiredAuctions() {
    try {
        const mongo = await connectToDatabase();
        const timestamp = new Date(); // Data e ora correnti

        const auctions = await mongo.collection("auctions").find().toArray();

        for (let auction of auctions) {
            const endDate = new Date(auction.endDate);
            if (timestamp > endDate) {
                await mongo.collection("auctions").updateOne(
                    { id: auction.id },
                    { $set: { expired: true } }
                );
            } else {
                await mongo.collection("auctions").updateOne(
                    { id: auction.id },
                    { $set: { expired: false } }
                );
            }
        }
    } catch (err) {
        console.error("Errore durante l'aggiornamento delle aste:", err);
    }
}

export function checkDate(endDate) {
    const timestamp = new Date();
    const end = new Date(endDate);
    return timestamp >= end;
}



