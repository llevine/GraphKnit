App.Models.Graph = Backbone.Model.extend({
	urlRoot: '/graphs',
	initialize: function(){
		console.log('created new graph model');
	},
	defaults: {
		user_id: null,
		name: 'My First Graph',
		category: 'My Category',
		image_url: '',
		product_image: '',
		// delete difficulty for now
		// difficulty: null,
		// gauge: 0,
		// rows: 100,
		// columns: 100,
		// delete number of colors
		// number_of_colors: 1,
		layout: '|',
		notes: 'Graph notes',
		privacy: false,
		preview: ''
	}
});
