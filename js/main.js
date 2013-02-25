require.config({
  paths: {
		'underscore': 'libs/underscore-min',
		'backbone': 'libs/backbone-min',
		'dust': 'libs/dust-min',
		'fastClick': 'libs/fastclick',
		'jtools': 'libs/jquery.tools.min'
	},
	shim: {
		dust: {
			'exports': 'dust'
		},
		underscore: {
			'exports': '_'
		},
		backbone: {
			'deps': ['jquery', 'underscore', 'dust'],
			'exports': 'Backbone'
		},
		fastClick: {
			'exports': 'fastClick'
		},
		jtools: {
			'exports': 'jtools'
		}
	}
});

require([ 'routes' ], function(Router){
	this.router = new Router();
});
