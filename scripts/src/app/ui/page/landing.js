define(['jquery', 'app/util/useragent'], function($, UserAgent){

	'use strict';

	return {
		init: function( columns, start ){
			if( UserAgent.isIeOldie() ) {
				this._clearRow( $( '.landing-grid > .pod' ), columns, start );
			}
		},
		_clearRow: function ( $items, columns, start ) {
			start = start !== undefined ? start - 1 : 0;
			for ( var i = 0; $items.length > i; i++ ) {
				var $item = $( $items[i] ),
					clear = ( i - start ) % columns === 0 || start === i ? true : false;
				if ( clear ) {
					$item.css({
						clear: 'both'
					});
				}
			}
		}
	};
} );