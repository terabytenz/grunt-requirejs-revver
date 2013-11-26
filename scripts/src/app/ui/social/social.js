define( ['jquery', 'app/ui/popup/popup'], function ( $, Popup ) {

	'use strict';

	return {
		init: function () {
			$( '.js-social-popup' ).on( 'click', this._processClick );
		},
		_processClick: function ( event ) {
			event.preventDefault();
			Popup.open( this.href, 550, 450 );
		}
	};
} );