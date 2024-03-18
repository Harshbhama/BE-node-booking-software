const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
const upload = require('express-fileupload');
const iternaryController = require('./controllers/iternaryController');
const cookies = require("cookie-parser");
application.use(bodyparser.urlencoded({
    extended: true
}));
require('dotenv').config();
var corsOptions = {
    origin: 'http://localhost:3000' };
application.use(cors(corsOptions));
application.use(upload());
application.use(bodyparser.json({limit: '2mb'}))

application.use("/iternary", iternaryController)
application.use(cookies())
application.listen(4001, () => {
    console.log("server started at port ", 4001);
})