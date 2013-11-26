define( ['jquery', 'pubsub'], function ( $ ) {

	'use strict';

	//YAHOO WEATHER API http://developer.yahoo.com/weather/
	//Christchurch Weather ID from http://woeid.rosselliot.co.nz/lookup/christchurch
	//YQL Lookup to get YAHOO Weather data http://developer.yahoo.com/yql/console/?q=select%20*%20from%20weather.forecast%20where%20location%3D%22UKXX0117%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys#h=select%20*%20from%20weather.forecast%20where%20woeid%3D2502265
	var date = null;
	var TIMESTAMP = null;
	var WEATHER_URL = null;
	var degreesCharacter = '&deg;';
	var WOEID = $( '#js-weather' ).data( 'woeid' );

	//Yahoo Weather Icon mapping config
	var weatherIconMap = {
		tornado: 'tornado',
		tropicalstorm: '',
		hurricane: 'hurricane',
		severethunderstorms: 'thunder',
		thunderstorms: 'thunder',
		mixedrainandsnow: 'snowshower',
		mixedrainandsleet: 'snowshower',
		mixedsnowandsleet: 'snowshower',
		freezingdrizzle: 'drizzle',
		lightdrizzle: 'drizzle',
		drizzle: 'drizzle',
		rain: 'shower',
		showersinthevicinity: 'shower',
		freezingrain: 'shower',
		showers: 'shower',
		snowflurries: 'snowflurries',
		lightsnowshowers: 'snowshower',
		blowingsnow: 'snow',
		snow: 'snow',
		hail: 'hail',
		sleet: 'hail',
		dust: 'foggy',
		foggy: 'foggy',
		haze: 'foggy',
		smoky: 'foggy',
		blustery: 'windy',
		windy: 'windy',
		cold: 'cold',
		cloudy: 'cloudy',
		mostlycloudy: 'cloudy',
		mostlycloudynight: 'cloudy',
		mostlycloudyday: 'cloudy',
		partlycloudynight: 'cloudy',
		partlycloudyday: 'cloudy',
		clearnight: 'clearnight',
		sunny: 'sunny',
		fair: 'sunny',
		fairnight: 'fairnight',
		fairday: 'sunny',
		mixedrainandhail: 'snowshower',
		hot: 'sunny',
		isolatedthunderstorms: 'thunder',
		scatteredthunderstorms: 'thunder',
		rainshower: 'shower',
		lightrainshower: 'shower',
		scatteredshowers: 'shower',
		scatteredsnowshowers: 'shower',
		heavysnow: 'snow',
		partlycloudy: 'cloudy',
		thundershowers: 'showthunder',
		snowshowers: 'snowshower',
		isolatedthundershowers: 'showthunder',
		notavailable: ''
	};

	//Once data is returned from Yahoo we populate this object and allow it to be publicly accessed through pubsub message '/weather/ready'
	var weather = {
		time: "",
		temp: "",
		forecast: "",
		date: "",
		icon: ""
	};

	return {
		
		init: function () {

			date = new Date();
			TIMESTAMP = this._generateTimestamp();
			WEATHER_URL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D' + WOEID + '&format=json&_maxage=3600&rnd=_' + TIMESTAMP;
			this._retrieveWeather();
		},

		_retrieveWeather: function () {
			var module = this;
			require( ['async!' + WEATHER_URL], function ( response ) {
				module._processResponse( response );
			} );
		},

		_processResponse: function ( response ) {
			this._setForecast( response );
		},

		_setForecast: function ( response ) {
			if ( !response || !response.query || !response.query.results ) {
				return;
			}
			var results = response.query.results;
			var conditions = results.channel.item.condition;
			var strippedForecast = this._parseForecast( conditions.text );

			weather.time = this._currentTime();
			weather.temp = this._convertToCelsius( conditions.temp ) + degreesCharacter + ' C';
			weather.forecast = conditions.text;
			weather.date = this._removeTimeFromResponse( conditions.date );
			weather.icon = this._getWeatherIcon( strippedForecast );
			if ( !weather.icon ) {
				console.log( 'Icon needed for weather forecast:', strippedForecast );
			}
			$.publish( '/weather/ready', weather );
		},


		/* UTIL functions used to process the Yahoo Data */
		_getWeatherIcon: function ( forecast ) {
			return weatherIconMap[forecast] || '';
		},

		_parseForecast: function ( forecast ) {
			return forecast.toLowerCase().replace( /[\s\(\)]/g, '' );
		},

		_generateTimestamp: function () {
			return date.getUTCFullYear() + ( date.getUTCMonth() + 1 + '' ) + ( date.getUTCDate() + 1 + '' ) + date.getHours();
		},

		_currentTime: function () {
			var minutes = ( date.getMinutes() + '' ).length == 1 ? '0' + date.getMinutes() : date.getMinutes();
			return date.getHours() + ':' + minutes;
		},

		_removeTimeFromResponse: function ( dateString ) {
			var reTime = /\d{1,2}:\d{1,2}\s?(am|pm)\s?/;
			return dateString.replace( reTime, '' );
		},

		_convertToCelsius: function ( fahrenheit ) {
			return Math.round( ( fahrenheit - 32 ) / 1.8 );
		}
		
	};
} );