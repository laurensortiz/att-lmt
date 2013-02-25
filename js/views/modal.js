// views/modal.js

define([
	'jquery',
	'underscore',
	'backbone',
	'dust',
	'jtools',
	'templates/modals/channels',
	'templates/modals/customer-quote',
	'templates/modals/error',
	'templates/modals/extra-channels',
	'templates/modals/feedback',
	'templates/modals/follow-up',
	'templates/modals/help',
	'templates/modals/list-customer-quotes',
	'templates/modals/loading',
	'templates/modals/reset',
	'templates/modals/selected-channels',
	'templates/modals/multiple-addresses'],
function($, _, Backbone) {
	var Modal = Backbone.View.extend({

		// initialize a modal with 2 values:
		// the dust template name,
		// the json object with template variable data,
		initialize: function(name, data) {
			this.name = name;
			this.data = data || {};
			$(this.el).attr('id', name);
			$(this.el).appendTo('body');
			$(document).bind("keyup", {
				context: this
			}, this.bindEscKey);
			this.render();
			if(typeof $('input[placeholder],textarea[placeholder]').placeHolder === 'function') {
				$('input[placeholder],textarea[placeholder]').placeHolder();
			}
			$(".date").dateinput({
				trigger: true,
				format: 'dd mmmm yyyy',
				min: -1,
				offset: [-200, 170],
				value: 'enter date'
			});
			this.$el.filter('select').trigger('change');
			if (this.name === 'modals-channels') { this.$el.attr('class', 'modal english channelList'); }
		},
		className: 'modal',

		events: {
			// close button
			'click .close': 'destroy',
			// #modals-channels
			'change .filter-channel input': 'updateChannelFilters',
			'click .contentTop button': 'updateLanguageFilter',
			'click .channel-list-header a': 'updatePackageFilter',
			'change #modals-extra-channels select': 'updateExtraChannelFilters',
			'click #modals-multiple-addresses button': 'submitAddress',
			'click #modals-feedback input[type=submit]': 'submitFeedback',
			'click #modals-reset button': 'resetApp',
			'click #modals-customer-quote #include-sales-info': 'showSalesInfo',
			'keyup .required': 'validateInput',
			'click .caltrigger': 'openCalendar',
			'click #modals-customer-quote #submit': 'submitQuote'
		},

		render: function() {
			var modalView = this,
				closeLink = $('<a>', {
					'class': 'close',
					'href': '#close',
					'text': 'Cancel'
				}),
				wrapperModal = $('<div>', {
					'class': 'wrapperModal'
				}),
				overlay = $('<div>', {
					'class': 'overlay'
				});
			if(this.name !== 'modals-loading') {
				overlay.on('click', function() {
					modalView.destroy();
				});
			}
			dust.render(this.name, this.data, function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				modalView.$el.before(wrapperModal);
				modalView.$el.prependTo(wrapperModal);
				modalView.$el.html(output);
				modalView.$el.prepend(closeLink);
				wrapperModal.after(overlay);
			});
		},

		bindEscKey: function(event) {
			if(event.keyCode === 27) {
				event.data.context.destroy(event);
			}
		},

		validationPatterns: {
			cust_email: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
			conf_cust_email: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
			customer_name: /^[ a-zA-Z\_\'\.\-\,\+]{1,}$/,
			customer_number: /^(\([2-9]|[2-9])(\d{2}|\d{2}\))(-|.|\s)?\d{3}(-|.|\s)?\d{4}$/,
			attid: /^[0-9]{1,}$/,
			reAttid: /^[0-9]{1,}$/
		},

		validateInput: function(e) {
			// General validation for all modals
			var modalName = e.delegateTarget.id,
				inputs = this.$el.find(':text'),
				submit = this.$el.find('#submit'),
				form = this,
				results = {},
				errors = 0;
			_(inputs).each(function(input) {
				var id = $(input).attr('id'),
					value = $(input).val();
				if(value.match(form.validationPatterns[id])) {
					results[id] = 'validates';
				} else if(value === "") {
					results[id] = 'empty';
				} else {
					results[id] = 'error';
				}
			});

			// >Ends general validation	
			//Verify the name of modal
			switch(modalName) {

			case "modals-follow-up":
				var notes = $('#notes').val();
				if(notes !== "") {
					$('#save-update').removeAttr("disabled");
					return false;
				} else {
					$('#save-update').attr("disabled", "disabled");
					return true;
				}
				break;

			case "modals-feedback":
				var feedback = $('#feedback-message').val();
				if(feedback !== "") {
					submit.removeAttr("disabled");
					return false;
				} else {
					submit.attr('disabled', 'disabled');
					return true;
				}
				break;

			case "modals-customer-quote":
				var email = this.$el.find('#cust_email'),
					confEmail = this.$el.find('#conf_cust_email');
				_(inputs).each(function(input) {
					var id = $(input).attr('id');
					if((results[id] === 'error') && id !== 'rep-name' && id !== 'rep-num' && id !== 'rep-email') {
						$(input).addClass('error');
						errors++;
					} else if(email.val() !== confEmail.val()) {
						confEmail.addClass('error');
						errors++;
					} else {
						if(results[id] === 'empty' && id !== 'rep-name' && id !== 'rep-num' && id !== 'rep-email') {
							errors++;
						}
						$(input).removeClass('error');
					}
				});
				if(errors) {
					submit.attr('disabled', 'disabled');
				} else {
					submit.removeAttr('disabled');
				}
				break;

			case "modals-list-customer-quotes":
				var custATTID = this.$el.find('#attid'),
					confCustATTID = this.$el.find('#reAttid'),
					customer_notes = $('#cutomer_notes').val();
				_(inputs).each(function(input) {
					var id = $(input).attr('id');
					if((results[id] === 'error') && customer_notes === "") {
						$(input).addClass('error');
						errors++;
					} else if(custATTID.val() !== confCustATTID.val()) {
						confCustATTID.addClass('error');
						errors++;
					} else {
						if((results[id] === 'empty') && customer_notes === "") {
							errors++;
						}
						$(input).removeClass('error');
					}
				});
				if(errors) {
					submit.attr('disabled', 'disabled');
				} else {
					submit.removeAttr('disabled');
				}
				break;
			default:
				//default validation
			}
		},

		showSalesInfo: function(e) {
			var checked = this.$el.find('input#include-sales-info:checked'),
				unChecked = this.$el.find('input#include-sales-info:not(:checked)');
			if(!checked.length) {
				this.$el.find('.right').hide();
			} else {
				this.$el.find('.right').show();
			}
		},

		updateChannelFilters: function(e) {
			var checked = _.map(this.$el.find('.filter-channel input:checked'), function(box) { return 'channel-filter-' + box.value.toLowerCase(); });
			if (checked.length) { checked.push('channel-filter'); }
			this.model.set('channel-filters', checked);
			this.setChannelModalClass();
		},
		updateLanguageFilter: function(e){
			if ($(e.currentTarget).is('#english_package')) {
				this.model.set('channel-language', 'english'); }
			if ($(e.currentTarget).is('#latino_package')) {
				this.model.set('channel-language', 'latino'); }
			this.setChannelModalClass();
		},
		updatePackageFilter: function(e){
			e.preventDefault();
			var id = $(e.currentTarget).attr('id');
			if (id !== 'channelList') {
				this.model.set('channel-package', ['filter-package', id]);
			} else {
				this.model.set('channel-package', '');
			}
			this.$el.find('.channel-list-header th').removeClass('active');
			this.$el.find('.channel-list-header #'+id).parent().addClass('active');
			this.setChannelModalClass();
		},
		setChannelModalClass: function() {
			var channelFilters = this.model.get('channel-filters'),
					channelLanguage = this.model.get('channel-language'),
					channelPackage = this.model.get('channel-package');
			classTxt = _.union(['modal', channelLanguage], channelFilters, channelPackage);
			console.log('setModalclass: ', classTxt.join(' '));
			this.$el.attr('class', classTxt.join(' '));
		},

		updateExtraChannel: function(e) {
			var channelInfo = this.model.get('selectedChannels');
			dust.render('modals-selected-channels', {'selectedChannels':channelInfo}, function(err, output) {
				$('#selected-channels').html(output);
			});
		},
		updateExtraChannelFilters: function(e) {
			var selectedClass = '.' + $('#modals-extra-channels option:selected').val();
			$('#modals-extra-channels .custom-checkbox, #modals-extra-channels label').hide();
			$('#modals-extra-channels '+selectedClass).show();
		},

		openCalendar: function(e) {
			if(e) {
				e.preventDefault();
			}

		},
		resetApp: function() {
			this.destroy();
			window.location.hash = '/reset';
		},

		submitAddress: function() {
			this.destroy();
			window.location.hash = '/u-verse'
		},
		submitFeedback: function() {
			this.destroy();
		},
		submitQuote: function(e) {

			var checked = this.$el.find('input#customer-followup:checked');

			this.destroy();
			if(checked.length) {
				this.modal = new Modal('modals-list-customer-quotes');
			}
			return false;
		},

		destroy: function(e) {
			if(e) {
				e.preventDefault();
			}
			this.undelegateEvents();
			this.remove();
			$(document).off("keyup", this.bindEscKey);
			$('.overlay,.wrapperModal').remove();
		}
	});

	return Modal;
});