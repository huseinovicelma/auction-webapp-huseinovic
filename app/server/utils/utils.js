import { connectToDatabase } from "../db/db.js";

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

export function formattedDate(date) {
    const endDate = new Date(date);

    // Ottieni i singoli componenti della data
    const day = String(endDate.getDate()).padStart(2, '0');
    const month = String(endDate.getMonth() + 1).padStart(2, '0');
    const year = endDate.getFullYear();
    const hours = String(endDate.getHours()).padStart(2, '0');
    const minutes = String(endDate.getMinutes()).padStart(2, '0');
    const seconds = String(endDate.getSeconds()).padStart(2, '0');

    const finaldate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    return finaldate;
  }



