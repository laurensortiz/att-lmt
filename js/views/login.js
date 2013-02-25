// views/login.js

define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal',
	'models/LMTClientObject',
	'dust',
	'templates/login'],
function($, _, Backbone, Modal, lmtClient) {
	var Login = Backbone.View.extend({
		tagName: 'section',
		className: 'login',

		events: {
			'click button'                : 'validateLogin'
		},

		initialize: function() {
			$(this.el).prependTo('body');
			this.render();
		},
		render: function() {
			var login = this.$el;
			dust.render('login', lmtClient.toJSON(), function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				login.html(output);
			});
		},

		validationPatterns: {
			addr1: /^[a-zA-Z0-9-.\/] ?([a-zA-Z0-9-.\/]|[a-zA-Z0-9-.\/] )*[a-zA-Z0-9-.\/]$/,
			addr2: /^.*$/,
			city: /^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/,
			state: /^[a-zA-Z]{2}$/,
			zip: /^\d{5}(?:[-\s]\d{4})?$/,
			phone: /^(\([2-9]|[2-9])(\d{2}|\d{2}\))(-|.|\s)?\d{3}(-|.|\s)?\d{4}$/
		},
		validateLogin: function(e) {
			var inputs = this.$el.find(':text'),
					submit = this.$el.find('#submit'),
					radios = this.$el.find('input:checked'),
					login = this,
					validated = {};
			_(inputs).each(function(input) {
				var id = $(input).attr('id'),
						value = $(input).val();
				if (value.match(login.validationPatterns[id])) {
					validated[id] = value;
				} else {
					validated[id] = false;
				}
			});
			validated['phone-type'] = radios.length ? radios.eq(0).val() : false;

			// submit with phone
			if (validated['phone']
			 && validated['phone-type']) {
				lmtClient.login({
					'method': 'phone',
					'number': validated['phone'],
					'type': validated['phone-type']
				});
			} else

			// submit with address
			if (validated['addr1'] 
			 && validated['city'] 
			 && validated['state'] 
			 && validated['zip']) {
				lmtClient.login({
					'method': 'address',
					'addr1': validated['addr1'],
					'addr2': validated['addr2'],
					'city': validated['city'],
					'state': validated['state'],
					'zip': validated['zip']
				})
			} else {

				// validation failed
				if (validated['phone'] && !validated['phone-type']) {
					var errorModal = new Modal('modals-error', { message: 'Please select the type of phone you entered.'})
				} else {
					var errors = [];
					_.map(validated, function(value, key, obj) {
						if (value === false && value !== "") {
							$('#'+key).addClass('error');
							errors.push(key);
						} else {
							$('#'+key).removeClass('error');
						}
					});
					var errorModal = new Modal('modals-error', { message: 'Please enter a correct phone number or address. Bad fields: ' + errors.join(', ')})
				}
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
	
	return Login;
});
