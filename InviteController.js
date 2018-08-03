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

    Invite.create({
            name : req.body.name
            //email : req.body.email,
            //password : req.body.password
        }, 
        //fonction de callback (1er parametre : en cas erreur, 2eme paramètre : en cas de succès)
        function (err, invite) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
                console.log("erreur creation invite");
            } else {
            console.log("un invite : " +invite.name+ " a été ajouté");
            res.status(200).send(invite);
            }
            
        }
    );

});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

    Invite.find({
            //Its first parameter, an object, defines the requirements which must be fulfilled in order to return values. 
            //As in this example the object is empty, all invites from the database will be returned
        }, 
            //fonction de callback (1er parametre : en cas erreur, 2eme paramètre : en cas de succès)
        function (err, invites) {
            if (err) {
                return res.status(500).send("There was a problem finding the invites.");
                console.log("erreur recup invites");
            } else {
                res.status(200).send(invites);
                console.log("la liste des invites a été demandée");
            }
            
            
        }
    );

});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {

    Invite.findById(req.params.id, function (err, invite) {
        if (err) {
            return res.status(500).send("There was a problem finding the invite.");
            console.log("invite avec id: " +req.param.id+ " introuvable");
        } 
        if (!invite) {
            return res.status(404).send("No invite found.");
            console.log("aucun invite trouve");
        } else {
            res.status(200).send(invite);
            console.log("invite id : " +invite.id+ " a été trouvé");
        }
        
    });

});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {

    Invite.findByIdAndRemove(req.params.id, function (err, invite) {
        if (err) {
            return res.status(500).send("There was a problem deleting the invite.");
            console.log("erreur lors de la suppression de " +invite.name);
        } else {
            res.status(200).send("Invite "+ invite.name +" was deleted.");
            console.log("invite : " +invite.name+ " a été supprimé");
        }
    });

});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Invite.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, invite) {
        if (err) {
            return res.status(500).send("There was a problem updating the invite.");
            console.log("erreur lors de la mise à jour de invite " +invite.name);
        } else {
            res.status(200).send(invite);
            console.log("Mise à jour de invite " +invite.name);

        }
    });

});

module.exports = router;