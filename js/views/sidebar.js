// views/sidebar.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/LMTClientObject',
	'dust',
	'templates/sidebar'],
function($, _, Backbone, lmtClient) {
	var Sidebar = Backbone.View.extend({
		tagName: 'aside',
		model: lmtClient,
		initialize: function(){
			$(this.el).appendTo('body');
			this.render();
		},
		render: function(){
			var footer = this.$el;
			dust.render('sidebar', this.model.toJSON(), function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				footer.html(output);
			});
		},
		visible: function(val) {
			if (val === undefined) {
				return this.$el.is(':visible');
			} else {
				if (val === true) {
					this.$el.show();
				} else {
					this.$el.hide();
				}
				return this.$el.is(':visible');
			}
		},
		updateActiveScreen: function(screenName) {
			this.$el.find('a').removeClass('active').filter('.'+screenName).addClass('active');
		},
		destroy: function() {
			this.undelegateEvents();
			this.remove();
		}
	});
	
	return Sidebar;
});
