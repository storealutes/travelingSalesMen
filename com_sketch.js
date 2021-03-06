var cities 	   = [];
var record 	   = [];
var routes	   = [];
var rtDist	   = [];

var frameOffset = 0;
var seconds = 0;

var fps				= 60;
var cityCount 		= 6;
var genePool 		= 100;
var evolutionRate 	= 0.01;

var drawing = {
	w: 650,
	h: 430
};

record.route = [];
record.dist  = Infinity;
record.time  = 0;
record.cRoute= [];
record.cDist = Infinity;


//Lex Variables
var totalRoutes = 0;
var countRoutes = 1;
var croute      = [];
record.lexRoute = [];
record.lexDist  = Infinity;
record.lexTime  = 0;



function setup() {
  createCanvas(drawing.w, drawing.h);
  frameRate(fps);
  //Create n Random Cities
  var route = [];
  for (var i = 0; i < cityCount; i++){
	  cities[i] = createVector(random(width), random(height/2));
	  route[i] = i;
	  croute[i] = i;
  }
  
  //Randomize Initial Route Into n Routes
  for(var i = 0; i < genePool; i++){
  	routes[i] = shuffle(route);
  }
  
  //Lex Support
  record.lexDist = calcDistance(cities, croute);
  lexRecordRoute(croute);
  
  totalRoutes = factorial(cityCount);
  loop();
}

function draw() {
  background(51);
  seconds = (frameCount - frameOffset) / fps;
  
  //Genetic Algorithm
  calcRouteDistance();
  normalizeRouteDistance();
  nextGeneration();
  
  //Draw Cities
  fill(255);
  for (var i = 0; i < cities.length; i++){
	  ellipse(cities[i].x, cities[i].y, 8, 8);
  }
  
  //Sketch Current Time Record Route
   stroke (255, 0 , 0, 60);
   strokeWeight(4);
   noFill();
   beginShape();
   for(var i = 0; i < record.cRoute.length; i++){
	   var city = record.cRoute[i];
	   vertex(cities[city].x, cities[city].y);
   }
   endShape();
  
  //Sketch All Time Record Route
   stroke (0, 255 , 0);
   strokeWeight(4);
   noFill();
   beginShape();
   for(var i = 0; i < record.route.length; i++){
	   var city = record.route[i];
	   vertex(cities[city].x, cities[city].y);
   }
   endShape();
   
   ////////////SCREEN DIVIDE////////////////
   translate(0, height / 2);
   /////////////////////////////////////////
   
   //Draw Lex Cities
   	fill(255);
   	for (var i = 0; i < cities.length; i++){
   		ellipse(cities[i].x, cities[i].y, 8, 8);
 	}
 	
 	//Current Lex City
   stroke (255, 0 , 0, 60);
   strokeWeight(2);
   noFill();
   beginShape();
   for(var i = 0; i < croute.length; i++){
	   var city = croute[i];
	   vertex(cities[city].x, cities[city].y);
   }
   endShape();
   
   //Record Lex Route
   stroke (0, 255 , 0);
   strokeWeight(4);
   noFill();
   beginShape();
   for(var i = 0; i < record.lexRoute.length; i++){
	   var city = record.lexRoute[i];
	   vertex(cities[city].x, cities[city].y);
   }
   endShape();
   
   var d = calcDistance(cities, croute);
   if (d < record.lexDist){
	   record.lexDist = d;
	   record.lexTime = seconds;
	   lexRecordRoute(croute);
   }
   
   push();
   translate(0, -height / 2);
   //Genetic Labels
   textSize(32);
   fill(255);
   noStroke();
  text("Genetic", 5, 40);
  textSize(15);
  text("Record: "+nf(record.dist, 0, 3), 5, 55);
  text("Found In: "+nf(record.time,0, 2)+" Sec", 5, 70);
  
  //Divider
  translate(0, height / 2);
   stroke (0, 0, 0);
   strokeWeight(4);
   noFill();
   beginShape();
   vertex(0, 0);
   vertex(drawing.w, 0);
   endShape();
   
   //Lex Labels
   textSize(32);
   fill(255);
   noStroke();
   text("Lex", 5, 40);
   textSize(15);
   text("Record: "+nf(record.lexDist, 0, 3), 5, 55);
   text("Found In: "+nf(record.lexTime, 0 ,2)+" Sec", 5, 70);
   
   var percent = 100 * (countRoutes / totalRoutes);
   textSize(15);
   fill(255);
   noStroke();
   text(nf(percent, 0, 4) + "% compeleted", 5, height/2-5);
   
   pop();
   nextRoute();
   
}

function lexRecordRoute(route){
	record.lexRoute = [];
	record.lexRoute = route.slice();
}

function factorial(n) {
	if(n == 1){
		return 1;
	} else {
		return n * factorial(n-1);
	}
}

function nextRoute(){
	
	countRoutes ++;
	
	//Step 1
	var largestI = -1;
	for(var i = 0; i < croute.length-1; i++){
		if(croute[i] < croute[i+1]){
			largestI = i;
		}
	}
	if (largestI == -1){
		//Finished
		noLoop();
		console.log('Finished');
	}
	
	//Step 2
	var largestJ = -1;
	for(var j = 0; j < croute.length; j++){
		if (croute[largestI] < croute[j]){
			largestJ = j;
		}
	}
	
	//Step 3
	array_swap(croute, largestI, largestJ);
	
	//step 4
	var endArray = croute.splice(largestI + 1);
	endArray.reverse();
	croute = croute.concat(endArray);
}
