var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ViennoiserieSchema   = new Schema({
	image : String,
    name: String,
	prix : String,
	boulangerie : String 
});

module.exports = mongoose.model('viennoiseries', ViennoiserieSchema);