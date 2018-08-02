// contient les actions qui controle le flux des donnees vers et depuis la bdd
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Invite = require('./InviteObj');

// CREATES A NEW USER
//The first parameter is the route which will be linked to a function. This function is the second parameter
router.post('/', function (req, res) {

    Invite.create(
        {
            name : req.body.name
            //email : req.body.email,
            //password : req.body.password
        }, 
        //fonction de callback (1er parametre : en cas erreur, 2eme paramètre : en cas de succès)
        function (err, invite) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(invite);
        }
    );

});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

    Invite.find(
        {
            //Its first parameter, an object, defines the requirements which must be fulfilled in order to return values. 
            //As in this example the object is empty, all users from the database will be returned
        }, 
            //fonction de callback (1er parametre : en cas erreur, 2eme paramètre : en cas de succès)
            function (err, invites) {
            if (err) return res.status(500).send("There was a problem finding the invites.");
            res.status(200).send(invites);
        }
    );

});

module.exports = router;