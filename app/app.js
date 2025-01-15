const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./server/router/route.js");
const auth = require("./server/router/auth.js");
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "secret",  
    resave: false,     
    saveUninitialized: false,  
    cookie: {
        httpOnly: true,
        secure: false, // Metti a true in produzione con HTTPS
        maxAge: 1000 * 60 * 60, // Sessione valida per 1 ora
      },  
}));
app.use("/api", router);
app.use("/api/auth", auth);

app.listen(3000, () => {
    console.log("Web server started");
})
