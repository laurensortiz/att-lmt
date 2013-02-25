// views/screen.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/LMTClientObject',
	'views/modal',
	'dust',
	'templates/screens/VideoBasic',
	'templates/screens/HSIA',
	'templates/screens/CVOIP',
	'templates/screens/CHN',
	'templates/screens/checkout'],
function($, _, Backbone, lmtClient, Modal) {
	var Screen = Backbone.View.extend({

		initialize: function(name) {
			this.name = name;
			$(this.el).attr('id', this.name);
			$(this.el).appendTo('body');
			this.render();
		},
		className: 'tab-screen',
		model: lmtClient,

		events: {
			'click .listChannels'              : 'listChannels',
			'click .international-programming' : 'extraChannels',
			'click .movies-sports'             : 'extraChannels'
		},

		listChannels: function(){
			this.modal = new Modal('modals-channels', lmtClient.attributes);
			this.modal.model = lmtClient;
		},
		extraChannels: function(e){
			e.preventDefault();
			this.modal = new Modal('modals-extra-channels', lmtClient.attributes);
			this.modal.model = lmtClient;
			var channelModal = this.modal;
      lmtClient.bind('change:selectedChannels', function() {
      	channelModal.updateExtraChannel(e);
      });
		},
		render: function() {
			var ele = this.$el;
			dust.render("screens-"+this.name, this.model.toJSON(), function(err, output) {
				// if this is throwing an error make sure your template
				// is declared in the define() dependencies
				ele.html(output);
			});
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
	
	return Screen;
});
