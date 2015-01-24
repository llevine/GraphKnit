// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
//= require handlebars
//= require_self
//= require_tree ./backbone/routers
//= require_tree ./backbone/models
//= require_tree ./backbone/collections
//= require_tree ./backbone/views
//= require_tree ./templates
//= require_tree .
var App = {
	Models: {}, 
	Collections: {}, 
	Views: {}, 
	Routers: {},
};


// global variable that stores the color to be used on the grid. Set the default color to black.
var currentColor = '#000';


// runs when the page has loaded.
$(function(){
	console.log('the page has loaded');
	graphModel = new App.Models.Graph;
	renderSwatches();
	drawGraph();

	// to download the graph as a jpeg.
	// You can even change the file-name dynamically by setting the attribute downloadLnk.download = 'myFilename.jpg'.
	$("#downloadLnk").click(function(){
		alert('clicked');
		var c = document.getElementById("graph");
		var dt = c.toDataURL('image/jpeg');
    this.href = dt;
	});

	$("#saveGraph").click(function(){
		alert('graph is saved')
		graphModel.sync();
	});
})

// function gets the graph context
function getGraphContext(){
	var c = document.getElementById("graph");
	return c.getContext("2d");
}

function renderSwatches(){
	// gets each swatch class div element finds it's id and sets that id to be the background color of the div
	$('.swatch').each(function(){ 
		var x = $(this).attr('id'); 
		$(this).css({background: '#' + x});
		$(this).click(function(){
			currentColor = '#' + x;
				//alert(currentColor);
		});
	});
}

// adds the graph to the dom
function drawGraph(){
	var ctx = getGraphContext();

	// adds a white rectangle behind the graph, so when download the graph as jpeg background is white, NOT black
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,800,800);
	// draws the horizontal lines
	for (var i=0; i<=40; i++){
		// (y, x)
		ctx.moveTo(0, i*20);
		ctx.lineTo(800, i*20);
		ctx.stroke();
	}
	// draws the vertical lines
	for (var i=0; i<=40; i++){
		ctx.moveTo(i*20, 0);
		ctx.lineTo(i*20, 800);
		ctx.stroke();
	}
	// gets the graph and adds a click listener to each cell
	var c = document.getElementById("graph"); 
	c.addEventListener('click', function(evt) {
		// gets the position of the mouse
      var mousePos = getMousePos(c, evt);
      var i = Math.floor(mousePos.x/20);
      var j = Math.floor(mousePos.y/20);
      fillSquare(i,j);
      updateLayout(i,j);
  }, false);
}

// fills the clicked square with the selected color
function fillSquare(i,j) {
	var ctx = getGraphContext();
	ctx.fillStyle = currentColor;
	// x start,y start, width, length
	ctx.fillRect((i*20+1),(j*20+1),18,18);
}

// gets the mouse position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function updateLayout(i,j){
	var matrix = graphModel.get('layout');
	matrix[i][j] = currentColor;
}

// array of colors to add to database for colorpallete
// ['#5a5b5e','#313132','#1a1718','#caf0a1','#a1d06d','#6f8f4c','#366219','#2a4b13','#1b2f0c','#eeb7fa','#b671c7','#ab47c4','#9b00d6','#480061','#290037','#fff3b7','#ffe578','#fecd3a','#5a2f0f','#3d210a','#2a1807','#97999c','#e0e1e3','#ffffff','#a2c8fa','#62a3f8','#386eef','#2128d6','#090089','#09005b','#feb6b9','#fd9197','#f36d74','#fc2237','#fc0016','#8b000c','#fec3ad','#fd997a','#fd724c','#fd9550','#fd6725','#cc5c1f']
