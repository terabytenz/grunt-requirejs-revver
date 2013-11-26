define( ['jquery', 'pubsub'], function ( $ ) {

	var module;
	var $aside;

	return {
		init: function () {

			$aside = $( '.aside' );
			module = this;
			module._initSidebarContent();

			$( '.aside' ).find( '.lazy-content' ).on( 'ajaxInclude', function () {
				setTimeout( function () {
					module._initSidebarContent();
				}, 100 );
			} );

		},
		_initSidebarContent: function () {
			module._checkWeather();
			module._checkSocialMedia();
			module._checkSidebarRotator();
			if ( $aside.find( '.lazy-auto' ) ) {
				$.publish( '/lazyload/loadimages', $aside );
			}
		},
		_checkSidebarRotator: function () {
			if ( $aside.find( '.js-rotator-default' ).length ) {
				require( ['app/ui/rotator/default'], function ( RotatorDefault ) {
					RotatorDefault.init();
				} );
			}
		},
		_checkWeather: function () {

			if ( $( '.js-pod-weather' ).length ) {
				require( ['app/ui/weather/forecast', 'app/ui/weather/pod'], function ( Forecast, WeatherPod ) {
					WeatherPod.init();
					Forecast.init();
				} );
			}
		},
		_checkSocialMedia: function () {

			if ( $( '.js-social-popup' ).length ) {
				require( ['app/ui/social/social'], function ( Social ) {
					Social.init();
				} );
			}

		}
	};

} );