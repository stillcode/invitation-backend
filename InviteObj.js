// declaration de la structure de l'objet invite

var mongoose = require('mongoose');  
var InviteSchema = new mongoose.Schema({  
  name: String
//   email: String,
//   password: String
});
mongoose.model('Invite', InviteSchema);

module.exports = mongoose.model('Invite');