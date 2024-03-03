const express = require("express")
const application = express()
const bodyparser = require("body-parser")
const cors = require('cors');
application.use(bodyparser.urlencoded({
    extended: true
}));
require('dotenv').config();
var corsOptions = {
    origin: 'http://localhost:3000' };
application.use(cors(corsOptions));
application.use(bodyparser.json({limit: '2mb'}))

application.listen(process.env.API_PORT, () => {
    console.log("server started at port ", process.env.API_PORT);
})