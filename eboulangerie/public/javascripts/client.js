'use strict';

function GetPatisserieAll()
{
	console.log("test");
	
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/patisseries";
					
	oReq.onreadystatechange = function() {
		console.log("dedans on ready ");
			if (oReq.readyState == 4 && oReq.status == 200) {
				var result = JSON.parse(oReq.response);	
				console.log("Result : " + result.html);
				document.querySelector('#patisserie').innerHTML = result.html;				
			}
		};
		
	oReq.open("GET", url, true);
	oReq.send();
	console.log("bonjour");
            
}

function GetVienoiserieAll()
{
	console.log("test");
	
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/viennoiseries";
					
	oReq.onreadystatechange = function() {
		console.log("dedans on ready ");
			if (oReq.readyState == 4 && oReq.status == 200) {
				var result = JSON.parse(oReq.response);	
				//console.log("Result : " + result.html);
				document.querySelector('#viennoiserie').innerHTML = result.html;			
			}
		};
		
	oReq.open("GET", url, true);
	oReq.send();
	console.log("bonjour");
            
}

function GetPanier()
{
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/panier";
					
	oReq.onreadystatechange = function() {
		console.log("dedans on ready ");
			if (oReq.readyState == 4 && oReq.status == 200) {
				var result = JSON.parse(oReq.response);	
				console.log("Result : " + result.html);
				document.querySelector('#panier').innerHTML = result.html;			
			}
			};
		
	oReq.open("GET", url, true);
	oReq.send();
	console.log("bonjour");
            
}

function AddElement(id, prix)
{	
	console.log(id);
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/panier?name="+id+"&prix="+prix+"&nombre=1"; //?name= & prix= &quantite=
		
	oReq.open("POST", url, true);
	oReq.send();
	console.log("ajouter");	
}
	

function GetPatisserie(id)
{
	console.log(id);
	
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/patisseries/"+id;
					
	oReq.onreadystatechange = function() {
		console.log("dedans on ready ");
			if (oReq.readyState == 4 && oReq.status == 200) {
				var result = JSON.parse(oReq.response);	
				console.log("Result : " + result.html);			
				document.querySelector('#detailPatis').innerHTML = result.html;			
			}
		};
		
	oReq.open("GET", url, true);
	oReq.send();
	console.log("bonjour");
	
}

function GetViennoiserie(id)
{
	var id = id;
	console.log(id);
	
	var oReq = new XMLHttpRequest();	
	var url = "http://localhost:8080/api/viennoiserie/56f13b88c502187c262074f7";
					
	oReq.onreadystatechange = function() {
		console.log("dedans on ready ");
			if (oReq.readyState == 4 && oReq.status == 200) {
				var result = JSON.parse(oReq.response);	
				console.log("Result : " + result.html);			
				document.querySelector('#detailVienn').innerHTML = result.html;			
			}
		};
		
	oReq.open("GET", url, true);
	oReq.send();
	console.log("bonjour");
}

Array.prototype.where = function (filter) {

    var collection = this;

    switch(typeof filter) { 

        case 'function': 
            return $.grep(collection, filter); 

        case 'object':
            for(var property in filter) {
              if(!filter.hasOwnProperty(property)) 
                  continue; // ignore inherited properties

              collection = $.grep(collection, function (item) {
                  return item[property] === filter[property];
              });
            }
            return collection.slice(0); // copy the array 
                                      // (in case of empty object filter)

        default: 
            throw new TypeError('func must be either a' +
                'function or an object of properties and values to filter by'); 
    }
};


function LignePanier (code, qte, prix)
{
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.ajouterQte = function(qte)
    {
        this.qteArticle += qte;
    }
    this.getPrixLigne = function()
    {
        var resultat = this.prixArticle * this.qteArticle;
        return resultat;
    }
    this.getCode = function() 
    {
        return this.codeArticle;
    }
}

function Panier()
{
    this.liste = [];
    this.ajouterArticle = function(code, qte, prix)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix));
        else this.liste[index].ajouterQte(qte);
    }
    this.getPrixPanier = function()
    {
        var total = 0;
        for(var i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getPrixLigne();
        return total;
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1;
    }
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}
function ajouter(element)
{
	var id = element.getAttribute("data-info").split(",");
	console.log(id[0]);
	console.log(id[1]);
	console.log("panier");
	
	AddElement(id[0],id[1]);
	
	var monPanier = new Panier();
	monPanier.ajouterArticle(id[0], 2, Number(id[1]));
	var tableau = document.getElementById("tableau");
	var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
	if (longueurTab > 0)
	{
		for(var i = longueurTab ; i > 0  ; i--)
		{
			monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
			tableau.deleteRow(i);
		}
	}
	var longueur = monPanier.liste.length;
	for(var i = 0 ; i < longueur ; i++)
	{
		var ligne = monPanier.liste[i];
		var ligneTableau = tableau.insertRow(-1);
		var colonne1 = ligneTableau.insertCell(0);
		colonne1.innerHTML += ligne.getCode();
		var colonne2 = ligneTableau.insertCell(1);
		colonne2.innerHTML += ligne.qteArticle;
		var colonne3 = ligneTableau.insertCell(2);
		colonne3.innerHTML += ligne.prixArticle;
		var colonne4 = ligneTableau.insertCell(3);
		colonne4.innerHTML += ligne.getPrixLigne();
		var colonne5 = ligneTableau.insertCell(4);
		colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
	}
	document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
	document.getElementById("nbreLignes").innerHTML = longueur;
}

function supprimer(code)
{
	var monPanier = new Panier();
	var tableau = document.getElementById("tableau");
	var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
	if (longueurTab > 0)
	{
		for(var i = longueurTab ; i > 0  ; i--)
		{
			monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
			tableau.deleteRow(i);
		}
	}
	monPanier.supprimerArticle(code);
	var longueur = monPanier.liste.length;
	for(var i = 0 ; i < longueur ; i++)
	{
		var ligne = monPanier.liste[i];
		var ligneTableau = tableau.insertRow(-1);
		var colonne1 = ligneTableau.insertCell(0);
		colonne1.innerHTML += ligne.getCode();
		var colonne2 = ligneTableau.insertCell(1);
		colonne2.innerHTML += ligne.qteArticle;
		var colonne3 = ligneTableau.insertCell(2);
		colonne3.innerHTML += ligne.prixArticle;
		var colonne5 = ligneTableau.insertCell(3);
		colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
	}
	document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
	document.getElementById("nbreLignes").innerHTML = longueur;
}

			
GetPatisserieAll();
GetVienoiserieAll(); 
GetViennoiserie();

GetPanier();  
//AddElement();  