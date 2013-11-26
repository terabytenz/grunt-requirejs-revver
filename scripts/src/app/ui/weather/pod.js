define( ['jquery', 'pubsub'], function ( $, pubsub ) {

	'use strict';
	
	var $weatherElem = $( '#js-weather' );
	var $dateTemp = $weatherElem.find( '.js-weather-time-temp' );
	var $forecast = $weatherElem.find( '.js-weather-forecast' );
	var $date = $weatherElem.find( '.js-weather-date' );
	var $icon = $weatherElem.find( '.js-weather-icon' );

	return {
		_initSubscriptions: function () {
			$.subscribe( '/weather/ready', this.renderWeatherData );
		},

		/* Sample Weather Object ==============
		weather = {
		time: "2:43 PM",
		temp: "16° C",
		forecast: "Rain developing",
		date: "Fri, 29 Jun 2012 NZST"
		}
		================*/
		renderWeatherData: function ( weather ) {
			$dateTemp.html( weather.time + ', ' + weather.temp );
			$forecast.text( weather.forecast );
			$date.text( weather.date );
			if ( weather.icon ) {
				$icon.addClass( 'iconf-' + weather.icon );
			} else {
				$icon.css( 'display', 'none' );
			}

		},

		init: function () {
			this._initSubscriptions();
		}
	};

} );