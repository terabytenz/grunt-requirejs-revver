define( ['jquery'], function ( $ ) {
	return {
		init: function() {
			$( '.js-site-search-button' ).on( 'click', $.proxy( this._processClick, this ) );
		},
		_processClick: function ( event ) {
			if ( !$( '.js-site-search-text' )[0].value ) {
				event.preventDefault();
				//this._showError();
			}
		},
		_showError: function() {
			$( '.js-site-search-error' ).show();
		}
	};
} );