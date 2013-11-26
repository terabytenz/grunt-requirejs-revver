requirejs.config( {
	baseUrl: '/scripts/src/lib',
	paths: {
		async: 'requirejs-plugins/async',
		goog: 'requirejs-plugins/goog',
		propertyParser: 'requirejs-plugins/propertyParser',
		implementations: 'requirejs-plugins/amd-feature/dynamic',
		feature: 'requirejs-plugins/feature',
		app: '../app',
		//jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min',
		//jqueryui: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min',
		jquery: 'jquery-1.9.1',
		jqueryui: 'jquery-ui-1.10.2.custom.min',
		easing: 'jquery.easing.1.3',
		throttledebounce: 'jquery.ba-throttle-debounce.min',
		pubsub: 'jquery.ba-tinypubsub',
		lazyload: 'jquery.lazyload.1.8.2',
		lazyscroll: 'jquery.lazyscroll',
		imagesloaded: 'jquery.imagesloaded',
		evensteven: 'jquery.evensteven',
		tablescroll: 'jquery.tablescroll',
		phatfingaz: 'jquery.phatfingaz',
		hoverIntent: 'jquery.hoverIntent',
		expandcollapse: 'jquery.expandcollapse',
		tabbery: 'jquery.tabbery',
		brotator: 'jquery.brotator',
		scrollitup: 'jquery.scrollitup',
		datepicker: 'jquery-datepicker.min',
		colorbox: 'jquery.colorbox',
		JSON: 'json3.min'
	},
	shim: {
		matchMedia: {
			exports: 'matchMedia'
		},
		JSON: {
			exports: 'JSON'
		},
		jqueryui: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		easing: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		colorbox: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		ajaxInclude: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		lazyload: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		lazyscroll: {
			deps: ['jquery', 'throttledebounce', 'pubsub'],
			exports: 'jQuery'
		},
		appendAround: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		throttledebounce: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		pubsub: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		expandcollapse: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		evensteven: {
			deps: ['jquery', 'throttledebounce'],
			exports: 'jQuery'
		},
		tablescroll: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		phatfingaz: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		enquire: {
			deps:['feature!matchMedia'],
			exports: 'enquire'
		},
		hoverIntent: {
			exports: 'jQuery'
		},
		tabbery: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		brotator: {
			deps: ['jquery', 'easing', 'pubsub'],
			exports: 'jQuery'
		},
		scrollitup: {
			deps: ['easing', 'jquery'],
			exports: 'jQuery'
		},
		datepicker: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		raphael: {
			deps: ['eve'],
			exports: 'Raphael'
		},
		twitter: {
			deps: ['jquery'],
			exports: 'Twitter'
		},
		markermanager: {
			exports: 'MarkerManager'
		},
		hammer: {
			deps: ['jquery'],
			exports: 'jQuery'
		}
	}
} );