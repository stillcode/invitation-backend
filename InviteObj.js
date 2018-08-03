// declaration de la structure de l'objet invite

var mongoose = require('mongoose');  
var InviteSchema = new mongoose.Schema({
    name: {type: String, required: true}
  //status: {type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo', required: true}
  //   email: String,
//   password: String
}, 
  {timestamps: true} // Pour avoir les dates de création et de modification automatiquement gérés par mongoose
);

mongoose.model('Invite', InviteSchema);

module.exports = mongoose.model('Invite');