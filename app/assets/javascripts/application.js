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
	renderSwatches();
	drawGraph();
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