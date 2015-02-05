// this is the graph object
function Graph(){
	this.userID = null;
	this.name = 'Untitled Graph';
	this.category = 'Miscellaneous';
	this.imageURL = '';
	this.productImage = '';
	this.gauge = null;
	this.graphSize = [0,0];
	this.numOfColors = 1;
	this.layout = '|';
	this.notes = '';
	this.privacy = true;
	this.preview = '';
	this.backgroundColor = '#fff';
	this.element = document.getElementById("graph");
	this.context = this.element.getContext("2d");
	this.data = this.element.toDataURL('image/jpeg');
}

Graph.prototype.drawGraphTemplate = function(){
	var context = this.context;
	// sets the background color to white so when user downloads graph it has a background
	context.fillStyle = this.backgroundColor;
	rectangularGrid(context);
	// squareGrid(context);
}

Graph.prototype.cellClick = function(){
	var c = this.element;
	// gets the graph and adds a click listener to each cell
	c.addEventListener('click', function(evt) {
		// gets the position of the mouse
    var mousePos = getMousePos(c, evt);
    alert(mousePos.x);
    alert(mousePos.y);
    var i = Math.floor(mousePos.x/20);
    var j = Math.floor(mousePos.y/14);
    alert('i ' + i);
    alert('j ' + j);

    // renderCell(i,j);
    // updateLayout(i,j);
  }, false);
}








Graph.prototype.showInfo = function(){
	document.getElementById('graph-title').textContent = name;
	$('#graphInfo-container').append('<span class="info">Created By: </span>' + this.userID);
	$('#graphInfo-container').append('<span class="info">Category: </span>' + this.category);
	$('#graphInfo-container').append('<span class="info">Gauge: </span>' + this.gauge);
	$('#graphInfo-container').append('<span class="info">Number of Colors: </span>' + this.numOfColors);
	$('#graphInfo-container').append('<span class="info">Notes: </span>' + this.notes);
	$('#graphInfo-container').append('<span class="info">Privacy Settings: </span>' + this.privacy);
}

function squareGrid(context){
	console.log('square grid drawn');
	context.fillRect(0,0,800,800);

	// draws the horizontal lines. i stands for the number of lines I want drawn
	for (var i=0; i<=40; i++){
		// (0,0)(800,0),   (0,20)(800,20),   last: (0, 800)(740, 740)
		context.moveTo(0, i*20);
		context.lineTo(800, i*20);
		context.stroke();
	}

	// draws the vertical lines
	for (var i=0; i<=40; i++){
		context.moveTo(i*20, 0);
		context.lineTo(i*20, 800);
		context.stroke();
	}
}

function rectangularGrid(context){
	console.log('rectangular grid drawn');
	context.fillRect(0,0,1400,740);
	
	// draws the horizontal lines. i stands for the number of lines I want drawn
	for (var i=0; i<=100; i++){
		// (0,0)(800,0),   (0,20)(800,20),   last: (0, 800)(740, 740)
		context.moveTo(0, i*14);
		context.lineTo(1400, i*14);
		context.stroke();
	}

	// draws the vertical lines
	for (var i=0; i<=70; i++){
		context.moveTo(i*20, 0);
		context.lineTo(i*20, 740);
		context.stroke();
	}
}

Graph.prototype.renderGraph = function(){
	alert('renderGraph function begins');
	// alert("type of " this);
// if (typeof(graphModel) == "undefined" || graphModel == null) {
// // 			graphModel = new App.Models.Graph;
// // 			var name = graphModel.get('name');
// // 			document.getElementById('graph-title').textContent = name;
// // 			blankGraph();
// // 		}

}

Graph.prototype.graphInfoForDevOnly = function(){
	console.log('*************************FOR DEV ONLY**********************')
	console.log(this);
	console.log(this.userID);
	console.log(this.name);
	console.log(this.category);
	console.log(this.imageURL);
	console.log(this.productImage);
	console.log(this.gauge);
	console.log(this.graphSize);
	console.log(this.numOfColors);
	console.log(this.layout);
	console.log(this.notes);
	console.log(this.privacy);
	console.log(this.preview);
	// console.log(this.element);
	// console.log(this.context);
	// console.log(this.data);
	console.log('***********************************************');
}

