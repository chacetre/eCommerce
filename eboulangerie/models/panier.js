var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PanierSchema   = new Schema({
    name: String,
	prix : String,
	nombre : String 
});

module.exports = mongoose.model('panier', PanierSchema);