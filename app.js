var express = require('express');
var app = express();
var db = require('./db');
var InviteController = require('./InviteController');

//app.use telling the app to link it to the route /invites. Now, the / route within your invite controller will get mapped to /invites
app.use('/invites', InviteController);

module.exports = app;
//We use module.exports to make this app object visible
// to the rest of the program 