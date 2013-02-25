// views/footer.js

define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal',
	'dust',
	'templates/footer'],
function($, _, Backbone, Modal) {
	var Footer = Backbone.View.extend({

		tagName: 'footer',
		events: {
			'click .share-quote'    : 'modalQuote',
			'click .feedback'       : 'modalFeedback',
			'click .follow-up'      : 'modalFollowUp',
			'click .refresh'        : 'refreshPricing',
			'click .reset'          : 'resetApp'
		},

		initialize: function(){
			$(this.el).appendTo('body');
			this.render();
			this.model.bind('change:wirelessReceiver', this.enableButton, this);
			this.model.bind('change:wiredReceiver', this.enableButton, this);
			this.model.bind('change:tHomeDvr', this.enableButton, this);
			this.model.bind('change:hDef', this.enableButton, this);
			this.model.bind('change:hdPrem', this.enableButton, this);
			this.model.bind('change:cvoipPlan', this.enableButton, this);
			this.model.bind('change:hsiaPlan', this.enableButton, this);
			this.model.bind('change:iptvPlan', this.enableButton, this);
			this.model.bind('change:promotionCode', this.enableButton, this);
			this.model.bind('change:secondVoipLine', this.enableButton, this);
			this.model.bind('change:generaPkgGrp', this.enableButton, this);
			this.model.bind('change:connecTechSelected', this.enableButton, this);
			this.model.bind('jsonUpdated', this.disableButton, this);
		},
		render: function(){
			var footer = this.$el;
			dust.render('footer', {}, function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				footer.html(output);
			});
		},

		modalQuote: function(e) {
			e.preventDefault();
			this.modal = new Modal('modals-customer-quote', {});
		},
		modalFeedback: function(e) {
			e.preventDefault();
			this.modal = new Modal('modals-feedback', {});
		},
		modalFollowUp: function(e) {
			e.preventDefault();
			this.modal = new Modal('modals-follow-up', {});
		},
		resetApp: function(e) {
			e.preventDefault();
			this.modal = new Modal('modals-reset');
		},
		refreshPricing: function(e) {
			e.preventDefault();
			this.model.refreshPricing();
		},
		enableButton: function() {
			this.$el.find('.refresh').removeClass('disabled');
		},
		disableButton: function() {
			this.$el.find('.refresh').addClass('disabled');
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
		destroy: function() {
			this.undelegateEvents();
			this.remove();
		}
	});
	
	return Footer;
});
