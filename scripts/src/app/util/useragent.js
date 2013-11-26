define( [], function () {

	'use strict';

	return {
		getUA: function () {
			return window.navigator.userAgent;
		},
		isOldAndroid: function ( ua ) {
			var regex = /Android\s2\.(0|1|2|3)/i;
			return regex.test( ua );
		},
		isAndroid: function ( ua ) {
			var regex = /Android/i;
			return regex.test( ua );
		},
		isIOS: function () {
			return this.isIphone() || this.isIpad();
		},
		isIphone: function ( ua ) {
			var regex = /iP(hone|od)/i;
			return regex.test( ua );
		},
		isIpad: function ( ua ) {
			var regex = /iP(rod|ad)/i;
			return regex.test( ua );
		},
		isIe7: function () {
			return this._hasClass( 'ie7', document.documentElement.className );
		},
		isIe8: function () {
			return this._hasClass( 'ie8', document.documentElement.className );
		},
		isIeOldie: function () {
			return this._hasClass( 'oldie', document.documentElement.className );
		},
		_hasClass: function ( needle, haystack ) {
			return haystack.indexOf( needle ) > -1;
		}
	};

} );