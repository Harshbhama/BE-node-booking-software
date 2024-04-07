const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
const chatService = require('./controllers/chatController');
const cookies = require("cookie-parser");
application.use(bodyparser.urlencoded({
    extended: true
}));
require('dotenv').config();
var corsOptions = {
    origin: 'http://localhost:3000' };
application.use(cors(corsOptions));
application.use(bodyparser.json({limit: '2mb'}))

application.use("/chat", chatService)
application.use(cookies())
application.listen(4002, () => {
    console.log("server started at port ", 4002);
})