App.Models.Graph = Backbone.Model.extend({
	initialize: function(){
		console.log('created new graph model');
	},
	defaults: {
		name: 'My First Graph',
		category: '',
		image_url: '',
		product_image: '',
		difficulty: null,
		gauge: 0,
		rows: 100,
		columns: 100,
		number_of_colors: 1,
		layout: [],
		notes: 'Graph notes',
		privacy: false
	}
});