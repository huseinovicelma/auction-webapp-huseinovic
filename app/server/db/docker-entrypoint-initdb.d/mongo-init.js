db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [
        {
            role: "readWrite",
            db: "db"
        }
    ]
});
db = db.getSiblingDB('db');
db.createCollection('users');
db.getCollection('users').insertMany(
    [

    ]
);

db = db.getSiblingDB('db');
db.createCollection('auctions');
db.getCollection('auctions').insertMany(
[

    ]
);

db = db.getSiblingDB('db');
db.createCollection('bids');
db.getCollection('bids').insertMany(
[
  
    ]
);
