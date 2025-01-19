const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://mongo-auction-huseinovic:27017"
const DB_NAME = "db";
let cachedDB;

module.exports = {
    connectToDatabase: async () => {
        if (cachedDB) {
            console.log("Existing cached connection found!");
            return cachedDB;
        }
        console.log("Aquiring new DB connection...");
        try {
            const client = await MongoClient.connect(MONGODB_URI);
            const db = client.db(DB_NAME);
            cachedDB = db;
            return db;
        } catch (error) {
            console.log("ERROR aquiring DB connection!");
            console.log(error);
            throw error;
        }
    }
}
