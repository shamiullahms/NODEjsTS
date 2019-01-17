"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const settings_1 = require("./settings");
const app = express();
let messages = new createMessage_1.default(settings_1.Settings.PORT);
const dataConnection = (user, pass) => {
    return `mongodb://${user}:${pass}@ds143451.mlab.com:43451/pssocial`;
};
const database = dataConnection(settings_1.Settings.mlabUser, settings_1.Settings.mlabPass);
// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
});
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
crmRoutes_1.default(app);
//function with interface
const nameCreator = (name) => {
    return `Hello, ${name.firstName} ${name.lastName}`;
};
let myName = { firstName: 'Shamiullah', lastName: 'Mustafa' };
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => res.send(messages.messagePrint()));
app.listen(settings_1.Settings.PORT, () => console.log(nameCreator(myName), messages.messagePrint()));
