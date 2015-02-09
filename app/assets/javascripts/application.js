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

function setCurrentColor(selection){
	return currentColor = selection;
}

//////////////////////////////////////
//              ON_LOAD             //
//////////////////////////////////////

// Why is this here???
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
		graphModel.graphInfoForDevOnly();	
	}
	if (graphModel != null) {
		$("#editInfo").click(function() {
	        $("#graphInfo-container #graph_name").text($(this).val().trim());
	        $("#graphInfo-container input[type=text]").val('');
	        $("#valueFromMyModal").val('');
	        $("#graphInfo-container").show(500);
		});
		addEventListeners();
	}
	function addEventListeners(){
		console.log('event listeners added');

		// var c = graphModel.element;
		// // gets the graph and adds a click listener to each cell
		// c.addEventListener('click', function(evt) {
		// 	// gets the position of the mouse
	 //    var mousePos = getMousePos(c, evt);
	 //    var i = Math.floor(mousePos.x/20);
	 //    var j = Math.floor(mousePos.y/20);
	 //    graphModel.renderCell(i,j);
	 //    graphModel.updateLayout(i,j,currentColor);
  // 	}, false);

		// gets the graph and adds a click listener to each cell
		$('#graph').click(function(evt){
			// gets the position of the mouse
	    var mousePos = getMousePos(graphModel.element, evt);
	    var i = Math.floor(mousePos.x/20);
	    var j = Math.floor(mousePos.y/20);
	    graphModel.renderCell(i,j);
	    graphModel.updateLayout(i,j,currentColor);
  	});

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

		//adds click event listener to savegraph button. saves button on click
		$("#saveGraph").click(function(){
			alert('graph was saved!');
			graphModel.save();
		});

		$('#deleteGraph').click(function(){
			console.log('delete button was clicked');
			if (graphModel.id == null){
				alert('Graph is not saved');
			}
			else {
				alert(graphModel.id);
				$.ajax({
    			type: "DELETE",
    			url: "/graphs/" + graphModel.id,
			    success: function(data){   
			    	alert("success!");
			      window.location = "/users/" + $('#graphs-new').attr('data-userid');
			    }
				});
			}
		});
	}
})

// gets the mouse position
function getMousePos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

