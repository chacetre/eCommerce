var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var swig  = require('swig');
// view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 
var router = express.Router(); 



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose   = require('mongoose');
mongoose.connect('mongodb://dev:dev@ds021289.mlab.com:21289/eboulangerie'); 

var Patisseries = require('./models/patisseries'); 
var Viennoiserie = require('./models/viennoiseries');
var Panier = require('./models/panier');

// ROUTES FOR OUR API
// =============================================================================              // get an instance of the express Router

router.use(function(req, res, next) {
    
    console.log('Something is happening.');
    next();
});


router.get('/', function(req, res) { 

res.sendFile(path.join(__dirname+'/views/home.html'));
 
});

router.get('/page_patisserie',function(req,res)
{
	res.sendFile(path.join(__dirname+'/views/base.html'));
});

router.get('/page_viennoiserie',function(req,res)
{
	res.sendFile(path.join(__dirname+'/views/baseV.html'));
});

router.get('/page_patisserie_details',function(req,res)
{
	res.sendFile(path.join(__dirname+'/views/detailsP.html'));
});

router.get('/page_viennoiserie_details',function(req,res)
{
	res.sendFile(path.join(__dirname+'/views/detailsV.html'));
});

router.get('/page_panier',function(req,res)
{
	res.sendFile(path.join(__dirname+'/views/panier.html'));
});

// CREER DES REQUETES 
//=====================================================================================

// * PATISSERIES
//			===============================================
router.route('/patisseries')

     .post(function(req, res) {
        
        var patiss = new Patisseries();    // create a new instance of the Bear model
        patiss.name = req.query.name;  	// set the bears name (comes from the request)
		patiss.prix = req.query.prix;
		patiss.boulangerie = req.query.boulangerie;
		patiss.image = req.query.image;
		
		patiss.save(function (err) {
			console.log("blabl");
			if(err)
			{
				res.send(err);
			}
			res.json({message : 'Bear created !'});
					});
         //save the bear and check for errors
                
    })
	
	.get(function(req, res) {
		
        Patisseries.find(function(err, patisseries) {			
			
            if (err)
                res.send(err);		
		
			swig.renderFile('./views/viewallp.html', { patisserie : patisseries } ,
			function(err, output){ 
				if(err){ throw err; }
				res.status(200).send({html : output}); 
				res.end(); 
			});
						
			console.log("requete get ");
			
        });
		
    });
	
	

router.route('/patisseries/:patisseries_id')

    .get(function(req, res) {
		
		Patisseries.findById(req.params.patisseries_id,function(err, patisseries) {			
			
          if (err)
                res.send(err);
            
			swig.renderFile('./views/detailViewP.html', { patisserie : patisseries } ,
			function(err, output){ 
				if(err){ throw err; }
				res.status(200).send({html : output}); 
				res.end(); 
			});
						
			console.log("requete get ");
        });
    });

// VIENNOISERIE 
//		==================================================

router.route('/viennoiseries')

     .post(function(req, res) {
        
        var vienoi = new Viennoiserie();    // create a new instance of the Bear model
        vienoi.name = req.query.name;  	
		vienoi.prix = req.query.prix;
		vienoi.boulangerie = req.query.boulangerie;
		vienoi.image = req.query.image;
		
		vienoi.save(function (err) {
			if(err)
			{
				res.send(err);
			}
			res.json({message : 'Vienoiserie created !'});
					});
         //save the bear and check for errors
                
    })
	
	.get(function(req, res) {
        Viennoiserie.find(function(err, viennoiseries) {			
                       if (err)
						res.send(err);		
		
			swig.renderFile('./views/viewAllV.html', { viennoiserie : viennoiseries } ,
			function(err, output){ 
				if(err){ throw err; }
				res.status(200).send({html : output}); 
				res.end(); 
			});						
			console.log("requete get ");
			
        });	
    });

	//------------------------------------
router.route('/viennoiserie/:viennoiserie_id')

    .get(function(req, res) {
		
		Viennoiserie.findById(req.params.viennoiserie_id,function(err, viennoiserie) {			
			
          if (err)
                res.send(err);
			
			console.log(viennoiserie);
			swig.renderFile('./views/detailViewV.html', viennoiserie ,
			function(err, output){ 
				if(err){ throw err; }
				res.status(200).send({html : output}); 
				res.end(); 
			});
						
			console.log("requete get ");
        });
    });

// PANIER
// 		==================================
router.route('/panier')

		.post(function(req, res) {
				
				var panier = new Panier();    // create a new instance of the Bear model
				panier.name = req.query.name;  	
				panier.prix = req.query.prix;
				panier.nombre = req.query.nombre;
				
				panier.save(function (err) {
					if(err)
					{
						res.send(err);
					}
					res.json({message : 'Panier ajouter!'});
							});
				 
						
				})
				
		.get(function(req, res) {
				Panier.find(function(err, panier) {			
                       if (err)
						res.send(err);		
		
			swig.renderFile('./views/template_panier.html', { panier : panier } ,
			function(err, output){ 
				if(err){ throw err; }
				res.status(200).send({html : output}); 
				res.end(); 
			});						
			console.log("requete get ");
			
				});
				
			});
			
		// delete aussi 
		
			
			
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(__dirname +'/public'));


