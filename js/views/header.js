// views/header.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/LMTClientObject',
	'dust',
	'templates/header'],
function($, _, Backbone, lmtClient) {
	var Header = Backbone.View.extend({
		model: lmtClient,
		tagName: 'header',
		initialize: function(){
			$(this.el).prependTo('body');
			this.render();
		},
		events: {
			'click h2'         : 'changeAddress'
		},
		render: function(){
			var header = this.$el;
			dust.render('header', this.model.toJSON(), function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				header.html(output);
			});
		},
		changeAddress: function() {
			window.location.hash = '/';
		},
		visible: function(val) {
			if (val === undefined) {
				return this.$el.is(':visible');
			} else {
				if (val === true) {
					return this.$el.show();
				} else {
					return this.$el.hide();
				}
			}
		},
		destroy: function() {
			this.undelegateEvents();
			this.remove();
		}
	});
	
	return Header;
});
