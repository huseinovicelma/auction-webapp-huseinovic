const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./route.js");
const auth = require("./auth.js");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auctions", router);
app.use("/api/auth", auth);

app.listen(3000, () => {
    console.log("Web server started");
})
