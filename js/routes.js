define([
	'jquery',
	'underscore',
	'backbone',
	'fastClick',
	'views/login',
	'views/header',
	'views/sidebar',
	'views/footer',
	'views/screen',
	'models/LMTClientObject'
],
function(
	$,
	_,
	Backbone,
	FastClick,
	Login,
	Header,
	Sidebar,
	Footer,
	Screen,
	lmtClient
){
	var Router = Backbone.Router.extend({

		initialize: function(){
			Backbone.history.start();

			// bind view loading events
			this.bind('route:before', function() {
				this.clearScreen();
			});
			this.bind('route:after', function() {
				if(typeof $('input[placeholder],textarea[placeholder]').placeHolder === 'function')
				$('input[placeholder],textarea[placeholder]').placeHolder();
			});

			// bind events for custom inputs
		  $('body').on('change', ':checkbox', function(){
		    var ref = $(this),
		    		id = ref.attr('id'),
		        wrapper = ref.parent();
		    if (ref.is(':checked')) {
		    	wrapper.addClass('checked');
		    	if (ref.hasClass('extra-channel')) {
				    lmtClient.setExtraChannel(id, 'on');
		    	} else {
		    		lmtClient.set(id, true)
		    	}
		    } else {
		    	wrapper.removeClass('checked');
		    	if (ref.hasClass('extra-channel')) {
				    lmtClient.setExtraChannel(id, 'off');
		    	} else {
		    		lmtClient.set(id, false)
		    	}
		    }
		  });
	  	$('body').on('change', ':radio', function(){
		    var ref = $(this),wrapper = ref.parent();
		    var form=ref.closest('form');
		    if (ref.is(":checked")) {
			    $('.custom-radio').removeClass('checked');
			    wrapper.addClass('checked');
			    lmtClient.set($(this).attr('name'), $(this).attr('value'));
		    }
		  });
			$('body').on('change', 'select', function(e) {
		    var ref = $(this),
		    		id = ref.attr('id'),
						displayName = $(this).children("option:selected").text();
						componentCode = $(this).children("option:selected").val();
				$(this).next(".select-text").text(displayName);
				lmtClient.set(id, componentCode);
				lmtClient.set(id+'Name', displayName);
			});

			// remove 300ms delay on certain tablets
			this.fastClick = new FastClick(document.body);
		},

		routes: {
			''                        : 'login',
			'reset'                   : 'reset',
			'u-verse'                 : 'tabs',
			'u-verse/:screen'         : 'tabs'
		},

		login: function() {
			this.screen = new Login();
		},
		tabs: function(screenArg) {
			screenArg = screenArg || "VideoBasic";
			this.header = this.header ? this.header : new Header();
			this.sidebar = this.sidebar ? this.sidebar : new Sidebar();
			this.footer = this.footer ? this.footer : new Footer({model:lmtClient});
			this.screen = new Screen(screenArg);
			this.sidebar.updateActiveScreen(screenArg);
		},
		clearScreen: function() {
			if (this.modal) { this.modal = this.modal.visible() ? this.modal.destroy() : undefinded; }
			if (this.screen) { this.screen = this.screen.visible() ? this.screen.destroy() : undefinded; }
			if (this.header) { this.header = this.header.visible() ? this.header.destroy() : undefinded; }
			if (this.sidebar) { this.sidebar = this.sidebar.visible() ? this.sidebar.destroy() : undefinded; }
			if (this.footer) { this.footer = this.footer.visible() ? this.footer.destroy() : undefinded; }
		},
		reset: function() {
			lmtClient.resetJSON();
		}
	});

	// add the route:before event
	(function(rp) {
	    var _route = rp.route;
	    rp.route = function(route, name, callback) {
	        return _route.call(this, route, name, function() {
            this.trigger.apply(this, ['route:before'].concat(_.toArray(arguments)));
            callback.apply(this, arguments);
            this.trigger.apply(this, ['route:after'].concat(_.toArray(arguments)));
	        });
	    };
	})(Backbone.Router.prototype);

	return Router;
});
