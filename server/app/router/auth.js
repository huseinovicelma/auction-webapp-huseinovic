const bcrypt = require("bcryptjs");
const { xss } = require('express-xss-sanitizer');
const express = require("express");
const db = require("../db/db.js");
const router = express.Router();

const hashPassword = async (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ msg: 'Password is required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);  
        req.body.password = hashedPassword;  
        next(); 
    } catch (error) {
        console.error('Error hashing password:', error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

router.post("/signup", xss(), hashPassword, async (req, res) => {
    const { username, password, name, surname } = req.body;
    try {
        const mongo = await db.connectToDatabase();
        const existingUser = await mongo.collection("users").findOne({ username });

        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const lastUser = await mongo.collection("users").findOne({}, { sort: { id: -1 } });
        const newId = (lastUser?.id || 0) + 1;
        const newUser = { id: newId, username, password, name, surname };
        await mongo.collection("users").insertOne(newUser);

        res.json({ msg: "User created successfully" });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ msg: "Internal error" });
    }
});

router.post("/signin", xss(), async (req, res) => {
    try {
        const { username, password } = req.body;
        const mongo = await db.connectToDatabase();
        const user = await mongo.collection("users").findOne({ username });
        if (user && user.username === username) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ msg: "Username o password errati" });
            }    
            req.session.user = {
                id: user.id,
                username: user.username,
            };
            res.json({ msg: "Autenticazione avvenuta con successo",
                username: user.username}
            );
        } else {
            res.status(401).json({ msg: "Username o password errati" });
        }
    } catch (error) {
        res.status(500).json({msg: "Internal Error" });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error during logout:", err.message);
            return res.status(500).json({ msg: "Internal error" });
        }
        res.clearCookie("connect.sid"); 
        res.json({ msg: "Logout avvenuto con successo" });
    });
});




module.exports = router;
