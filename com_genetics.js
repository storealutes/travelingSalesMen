function calcRouteDistance() {
	record.cDist = Infinity;
	for(var i = 0; i < routes.length; i++){
		rtDist[i] = calcDistance(cities, routes[i]);
		if(rtDist[i] < record.dist){
			record.dist = rtDist[i];
			recordRoute(routes[i], true);
			console.log(record.dist);
		}
		if(rtDist[i] < record.cDist){
			record.cDist = rtDist[i];
			recordRoute(routes[i], false);
		}
		rtDist[i] = 1 / (rtDist[i] + 1);
	}	
}

function normalizeRouteDistance() {
	sum = 0;
	for(var i = 0; i < rtDist.length; i++){
		sum += rtDist[i];
	}
	for(var i = 0; i < rtDist.length; i++){
		rtDist[i] = rtDist[i] / sum;
	}
}

function nextGeneration() {
	var newRoutes = [];
	for (var i = 0; i < routes.length; i++){
		var survivorA = theFittest(routes, rtDist);
		var survivorB = theFittest(routes, rtDist);
		var survivor  = crossover(survivorA, survivorB);
		evolve(survivor, evolutionRate);
		newRoutes[i] = survivor;
	}
	routes = newRoutes;
}

function theFittest(pool, prob){
	var index = 0;
	var r = random(1);
	while(r > 0){
		r = r - prob[index];
		index ++;
	}
	index --;
	return pool[index];
}

function evolve(order, er){
	for(var i = 0; i < cityCount; i ++){
		if (random(1) < er){
			var indexA = floor(random(order.length));
			var indexB = (indexA + 1) % cityCount;
			var indexC = (indexB + 1) % cityCount;
			if(random(1) < 0.8){
				array_swap(order, indexA, indexB);
			}
			  else if(random(1) < 0.8){
				array_swap(order, indexA, indexC);
			}
			  else if(random(1) < 0.8){
				array_swap(order, indexA, indexC);
				array_swap(order, indexA, indexB);
			}
			  else if(random(1) < 0.8){
				array_swap(order, indexA, indexB);
				array_swap(order, indexA, indexC);
			}
		}
	}
}

function crossover(orderA, orderB){
	var indexA = floor(random(orderA.length));
	var indexB = indexA - floor(random(orderA.length));
	var newOrder = orderA.slice(indexA, indexB);
	for ( var i = 0; i < orderB.length; i ++){
		if(newOrder.indexOf(orderB[i]) == -1){
			newOrder.push(orderB[i]);
		}
	}
	return newOrder;
}

function array_swap(array, x, y){
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
}

function calcDistance(points, order) {
	var sum = 0;
	for (var i = 0; i < order.length-1; i ++){
		var pointA = points[order[i]];
		var pointB = points[order[i+1]];
		sum += dist(pointA.x, pointA.y, pointB.x, pointB.y);
	}
	
	return sum;
}

function recordRoute(route, allTime){
	if(allTime){
		record.route = [];
		record.route = route.slice();
	} else {
		record.cRoute = [];
		record.cRoute = route.slice();
	}
}