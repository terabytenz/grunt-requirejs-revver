define(['app/util/useragent'], function( UserAgent ) {

	'use strict';

	return {
		init: function () {
			this._hasSvgBackground();
		},
		_addClass: function ( className ) {
			document.documentElement.className += ' ' + className;
		},
		_hasSvgBackground: function () {

			var svgClass = 'svgbackground';
			var ua = UserAgent.getUA();
			var isIe = document.documentElement.className.indexOf( 'oldie' ) > -1;
			var isOldAndroid = UserAgent.isOldAndroid( ua );

			if ( isIe || isOldAndroid ) {
				svgClass = 'no-' + svgClass;
			}
			this._addClass( svgClass );
		}
	};

});