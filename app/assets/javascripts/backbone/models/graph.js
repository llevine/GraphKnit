// function defaultGraph() {
// 	var a = [];
// 	a.length = 40;
// 	for (var i = 0; i < 40; i++) {
// 		var b = [];
// 		b.length = 40;
// 		for (var j = 0; j < 40; j++) {
// 			b[j] = "#fff";
// 		}
// 		a[i] = b;
// 	}
// 	return a;
// }

App.Models.Graph = Backbone.Model.extend({
	urlRoot: '/graphs',
	//url: function() { return '/graphs'; },
	initialize: function(){
		console.log('created new graph model');
	},
	defaults: {
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
		privacy: false
	}
});
