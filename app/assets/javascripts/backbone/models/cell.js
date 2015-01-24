App.Models.Cell = Backbone.Model.extend({
	initialize: function(){
		console.log('created a new cell model')
	},
	defaults: {
		position: '',
		hexadecimal: '#FFFFFF',
    yarn: 'Yarn inforomation'
	}
});