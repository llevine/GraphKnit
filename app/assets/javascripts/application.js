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
var backgroundColor = '#fff'

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------- //

function setCurrentColor(selection){
	return currentColor = selection;
}

// runs when the page has loaded.
$(function(){	
	console.log('the page has loaded');	
	// checks to see if the container graphs-new is on the page. if so then it will run the js on page load
	if ($('#graphs-new').length === 1){
		if (typeof(graphModel) == "undefined" || graphModel == null) {
			graphModel = new App.Models.Graph;
			blankGraph();
		}
		listeningForCellClick();
		// renderPreview();
		// to download the graph as a jpeg.
		// You can even change the file-name dynamically by setting the attribute downloadLnk.download = 'myFilename.jpg'.
		$('#downloadLnk').click(function(){
			console.log('graph has been downloaded');
			// var c = document.getElementById("graph");
			// var dt = c.toDataURL('image/jpeg');
			var dt = getGraphInfo('data');
	    this.href = dt;
	    updatePreview(dt);
		});

// adds click event listener to swatches to style the active swatch 
		$('.swatch').one('click', function(){
			$('.swatch').removeClass('activeSwatch');
			$(this).addClass('activeSwatch');
		})

		$('#deleteGraph').click(function(){
			console.log('delete button was clicked');
			graphModel.destroy({
				success: function() {
					graphModel = new App.Models.Graph;
					blankGraph();
				}
			})
		})

// adds click event listener to savegraph button. saves button on click
		$("#saveGraph").click(function(){
			saveGraph();
		});
	}
})

function saveGraph(){
			console.log("You clicked save!");
			var dt = getGraphInfo('data');
			graphModel.set('preview', dt);
			
			// checks to see if the graph has been saved before. if it hasn't it will create a new entry in the db. if it is already in the db it will update the graph
			var isNew = (graphModel.id == null);
			graphModel.save(null, {
				success: function() {
					if (isNew) {
						saveUserID();
						//$('#actions').append('<a href="#" onclick="loadGraph(' + graphModel.id + ')">' + graphModel.id + '</a>');
					}
				}
			});
}

function saveUserID(){
		var userID = $('#graphs-new').attr('data-userid');
		console.log("current user is: " + $('#graphs-new').attr('data-userid'));
		graphModel.set("user_id", userID);
		console.log('the model has a user id of: ' + graphModel.get('user_id'));
		graphModel.save(null, {
			success: function() {
				console.log('saved ' + graphModel.get('user_id'));
			}
		});
}

function updatePreview(dt){
	$('#preview').empty();
	$('#preview').append('<img id="thumbnail" src="'+dt+'">');
}

// function renderPreview(){
// 	var dt = getGraphInfo('data');
// }

// function gets the graph context
function getGraphInfo(type){
	var c = document.getElementById("graph");
	if (type == 'element'){
		return c;
	}
	else if (type == 'context'){
		return c.getContext("2d");
	}
	else if (type == 'data'){
		return c.toDataURL('image/jpeg');
	}
}

// adds the graph to the dom
function blankGraph(){
	var ctx = getGraphInfo('context');

	// adds a white rectangle behind the graph, so when download the graph as jpeg background is white, NOT black
	ctx.fillStyle = backgroundColor;
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
}

function listeningForCellClick() {
	// gets the graph and adds a click listener to each cell
	var c = getGraphInfo('element'); 
	// gives you the starting cell
	c.addEventListener('click', function(evt) {
		// gets the position of the mouse
      var mousePos = getMousePos(c, evt);
      var i = Math.floor(mousePos.x/20);
      var j = Math.floor(mousePos.y/20);
      renderCell(i,j);
      updateLayout(i,j);
  }, false);
}

function loadGraph(g_id) {
	console.log("Loading: " + g_id);
	blankGraph();
	graphModel = new App.Models.Graph({id: g_id});
	graphModel.fetch({
		success: function() {
			graphModel.get('layout').split('|').forEach(function(triple) {
				var t = triple.split(",");
				if (t.length == 3) {
					currentColor = t[2];
					renderCell(t[0], t[1]);
				}
			});
		},
		error: function() { console.log("Object doesn't exist!"); }
	});
}

// fills the clicked square with the selected color
function renderCell(i,j) {
	var ctx = getGraphInfo('context');
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
	var s = graphModel.get('layout');
	s += "|" + i + "," + j + "," + currentColor;
	graphModel.set('layout', s);
}
