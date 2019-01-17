"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const app = express();
const PORT = 3000;
const mlabUser = 'psuser';
const mlabPass = 'psus3r';
let messages = new createMessage_1.default(PORT);
const dataConnection = (user, pass) => {
    return `mongodb://${user}:${pass}@ds143451.mlab.com:43451/pssocial`;
};
const database = dataConnection(mlabUser, mlabPass);
// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
});
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
crmRoutes_1.default(app);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(messages.messagePrint()));
app.listen(PORT, () => console.log(messages.messagePrint()));
