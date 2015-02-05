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

//////////////////////////////////////
//         GLOBAL VARIABLES         //
//////////////////////////////////////

// currentColor is the color that the cells would change to if clicked.
var currentColor = '#000';

//////////////////////////////////////
//              ON_LOAD             //
//////////////////////////////////////

var graphModel = null;

// runs when the page has loaded
$(function(){	
	console.log('the page has loaded');	

	// checks to see if the container graphs-new is on the page. if so then it will run the js on page load
	//if ($('#graphs-new').length === 1){
	if (graphModel == null) {
		graphModel = new Graph;
		graphModel.drawGraphTemplate();
		graphModel.showInfo();
		addEventListeners();
		


		graphModel.graphInfoForDevOnly();	
	}

	function addEventListeners(){
		console.log('event listeners added');

		var c = graphModel.element;
		// gets the graph and adds a click listener to each cell
		c.addEventListener('click', function(evt) {
			// gets the position of the mouse
	    var mousePos = getMousePos(c, evt);
	    var i = Math.floor(mousePos.x/20);
	    var j = Math.floor(mousePos.y/20);
	    graphModel.renderCell(i,j);
	    graphModel.updateLayout(i,j,currentColor);
  	}, false);


		// add click listener to the download btn
		$('#downloadLnk').click(function(){
			console.log('graph has been downloaded');
		  this.href = graphModel.data();
		});

		// adds click listener to swatches btn 
		$('.swatch').click(function(){
			$('.swatch').removeClass('activeSwatch');
			$(this).addClass('activeSwatch');
		});

		// $('#deleteGraph').click(function(){
		// 	console.log('delete button was clicked');
		// 	graphModel.delete;
		// });

		// adds click event listener to savegraph button. saves button on click
		// $("#saveGraph").click(function(){
		// 	alert('graph was saved!');
		// 	saveGraph();
		// });
	// }
	// }
	}



})

function setCurrentColor(selection){
	return currentColor = selection;
}

// gets the mouse position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}





// function showGraph(){
// 	var graphID = $('#show-graph').attr('data-graphid');
// 	// document.getElementById('graph-title').textContent = name;
// 	loadGraph(graphID);
// }

// function saveGraph(){
// 			console.log("You clicked save!");
// 			var dt = getGraphInfo('data');
// 			// updatePreview(dt);
// 			graphModel.set('preview', dt);
			
// 			// checks to see if the graph has been saved before. if it hasn't it will create a new entry in the db. if it is already in the db it will update the graph
// 			var isNew = (graphModel.id == null);
// 			graphModel.save(null, {
// 				success: function() {
// 					if (isNew) {
// 						saveUserID();
// 						//$('#actions').append('<a href="#" onclick="loadGraph(' + graphModel.id + ')">' + graphModel.id + '</a>');
// 					}
// 				}
// 			});
// }

// function saveUserID(){
// 		var userID = $('#graphs-new').attr('data-userid');
// 		// console.log("current user is: " + $('#graphs-new').attr('data-userid'));
// 		graphModel.set("user_id", userID);
// 		// console.log('the model has a user id of: ' + graphModel.get('user_id'));
// 		graphModel.save(null, {
// 			success: function() {
// 				console.log('saved ' + graphModel.get('user_id'));
// 			}
// 		});
// }



// function loadGraph(g_id) {
// 	console.log("Loading: " + g_id);
// 	blankGraph();
// 	graphModel = new App.Models.Graph({id: g_id});
// 	graphModel.fetch({
// 		success: function() {
// 			graphModel.get('layout').split('|').forEach(function(triple) {
// 				var t = triple.split(",");
// 				if (t.length == 3) {
// 					currentColor = t[2];
// 					renderCell(t[0], t[1]);
// 				}
// 			});
// 		},
// 		error: function() { console.log("Object doesn't exist!"); }
// 	});
// }