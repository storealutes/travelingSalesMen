function togglePause(){
	if(document.getElementById("tp").firstChild.nodeValue == "Pause"){
		noLoop();
		document.getElementById("tp").firstChild.nodeValue = "Resume";
	} else {
		loop();
		document.getElementById("tp").firstChild.nodeValue = "Pause";
	}
}

function restart(){
	cities 	   = [];
	record 	   = [];
 	routes	   = [];
	rtDist	   = [];

	record.route = [];
	record.dist  = Infinity;
	record.cRoute= [];
	record.cDist = Infinity;

	//Lex Variables
	totalRoutes = 0;
	countRoutes = 1;
	croute      = [];
	record.lexRoute = [];
	record.lexDist  = Infinity;
	
	fps				= parseInt(document.getElementById("as").value);
	cityCount 		= parseInt(document.getElementById("cc").value);
	genePool 		= parseInt(document.getElementById("gp").value);
	evolutionRate 	= parseInt(document.getElementById("er").value);

	setup();
}