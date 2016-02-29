
	var dotsX = [];
	var dotsY = [];
	
$(document).ready( function() {
	
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = 600;
	ctx.canvas.height = 400;
	
	$("#canvas").click( function() {
		
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		
		ctx.fillRect((event.pageX - canvas.offsetLeft), (event.pageY - canvas.offsetTop), 4,4);
		
		dotsX.push(event.pageX);
		dotsY.push(event.pageY);
		console.log(dotsX);
	});
	
	nearestNeighbor();
	/*$("#button").click( function() {
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#9400D3";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(dotsX[0] - canvas.offsetLeft, dotsY[0] - canvas.offsetTop);
		ctx.lineTo(dotsX[1] - canvas.offsetLeft, dotsY[1] - canvas.offsetTop);
		ctx.stroke();
			
	});*/
	
	//smallestIncrease();
});

function distance(x1, x2, y1, y2) {
	
	return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
	
}

function nearestNeighbor(){
	$("#button").click( function() {
		
		var dotsXNN = dotsX.slice();
		var dotsYNN = dotsY.slice();
		var emptyX = [];
		var emptyY = [];
		emptyX.push(dotsXNN[0]);
		emptyY.push(dotsYNN[0]);
		for (var i =1; i<dotsXNN.length; i++)
		{
			var toSave = 0;
			var lowestDistance = Number.MAX_VALUE;
			for (var j=0; j<emptyX.length; j++)
			{
				if ((distance(dotsXNN[i], emptyX[j], dotsYNN[i], emptyY[j])) < lowestDistance)
				{
					lowestDistance = (distance(dotsXNN[i], emptyX[j], dotsYNN[i], emptyY[j]));
					toSave = j;
				}
			}
			emptyX.splice(toSave + 1 , 0 , dotsXNN[i]);
			emptyY.splice(toSave + 1 , 0 , dotsYNN[i]);
		}
		
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#9400D3";
		ctx.lineWidth = 4;
		ctx.beginPath();
		for (var x = 0; x<emptyX.length -1; x++)
		{
			ctx.moveTo(emptyX[x] - canvas.offsetLeft, emptyY[x] - canvas.offsetTop);
			ctx.lineTo(emptyX[x+1] - canvas.offsetLeft, emptyY[x+1] - canvas.offsetTop);
			ctx.stroke();
		}
		
	});
	}
	
function smallestIncrease(){
	$("#button").click( function() {
		
		var dotsXNN = dotsX.slice();
		var dotsYNN = dotsY.slice();
		var emptyX = [];
		var emptyY = [];
		emptyX.push(dotsXNN[0]);
		emptyY.push(dotsYNN[0]);
		emptyX.push(dotsXNN[1]);
		emptyY.push(dotsYNN[1]);
		for (var i =2; i<dotsXNN.length; i++)
		{
			var toSave = 0;
			var lowestIncrease = Number.MAX_VALUE;
			
			for (var j=0; j<emptyX.length; j++)
			{
				if (j == emptyX.length -1)
				{
					if (distance(emptyX[j], dotsXNN[i], emptyY[j], dotsYNN[i]) < lowestIncrease)
					{
						lowestIncrease = distance(emptyX[j], dotsXNN[i], emptyY[j], dotsYNN[i]);
						toSave = j;
					}
				}
				else
				{
					var testisLower = 0-(distance(emptyX[j-1], emptyX[j], emptyY[j-1], emptyY[j]));
					testisLower = testisLower + (distance(emptyX[j-1], dotsXNN[i], emptyY[j-1], dotsYNN[i])) + (distance(emptyX[j], dotsXNN[i], emptyY[j], dotsYNN[i]));
					if (testisLower < lowestIncrease)
					{
						lowestIncrease = testisLower;
						toSave = j;
					}
				}
				
				emptyX.splice(toSave , 0 , dotsXNN[i]);
				emptyY.splice(toSave , 0 , dotsYNN[i]);
			}
		}
		
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#FF33CC";
		ctx.lineWidth = 4;
		ctx.beginPath();
		for (var x = 0; x<emptyX.length -1; x++)
		{
			ctx.moveTo(emptyX[x] - canvas.offsetLeft, emptyY[x] - canvas.offsetTop);
			ctx.lineTo(emptyX[x+1] - canvas.offsetLeft, emptyY[x+1] - canvas.offsetTop);
			ctx.stroke();
		}
		
		});
		
		//when you add it somewhere besides the end, the increase is the two connections beside it minus the connection that was already there
		//if you add it at the end you just add the new one
	}