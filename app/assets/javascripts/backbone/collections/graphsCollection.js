App.Collections.GraphsCollection = Backbone.Collection.extend({
	model: App.Models.Graph,
	url: '/',
	initialize: function(){
		console.log("new graphs collection created.")
	}
});