// views/selectSalesChannel.js

define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal',
	'models/employee',
	'dust',
	'templates/select-sales-channel'],
function($, _, Backbone, Modal, employee) {
	var SelectSalesChannel = Backbone.View.extend({
		tagName: 'section',
		className: 'selectSalesChannel',

		events: {
			'click button'                : 'attemptSelectSalesChannel'
		},

		initialize: function() {
			$(this.el).prependTo('body');
			this.render();
		},
		render: function() {
			var selectSalesChannel = this.$el;
			dust.render('select-sales-channel', employee.toJSON(), function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				var salesChannel = employee.get('salesChannel');
				selectSalesChannel.html(output);
				if (salesChannel) {
					$('select').val( salesChannel.value ).trigger('change');
				}
			});
		},
		attemptSelectSalesChannel: function() {
			var salesChannel = $('select option:selected');
			if (salesChannel.attr('value') === "") {
				var error = new Modal('modals-error', { message: "Please select a sales channel before going to the next step." });
				return false;
			} else {
				employee.set('salesChannel', {
					'value': salesChannel.attr('value'),
					'name': salesChannel.html()
				});
				window.location.hash = '/login'
			}
		},
		visible: function() {
			return true;
		},
		destroy: function() {
			this.undelegateEvents();
			this.remove();
		}
	});

	return SelectSalesChannel;
});
