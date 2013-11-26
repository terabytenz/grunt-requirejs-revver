define( ['jquery', 'app/ui/table/table'], function ( $ ) {

	'use strict';

	if ( $( '.rotator-media' ).length ) {
		require( ['app/ui/rotator/media/media'] );
	}

	if ( $( '.js-tooltip' ).length ) {
		require( ['app/ui/tooltip/tooltip'], function ( Tooltip ) {
			Tooltip.init();
		} );
	}

	if ( $( '.js-social-popup' ).length ) {
		require( ['app/ui/social/social'], function ( Social ) {
			Social.init();
		} );
	}

	if ( $( '.js-rotator-default' ).length ) {
		require( ['app/ui/rotator/default'], function ( RotatorDefault ) {
			RotatorDefault.init();
		} );
	}

	if ( $( '.js-availability.js-single-property' ).length ) {
		require( ['app/availability/availability'], function ( Availability ) {
			Availability.InitDetailAvailability();
		} );
	}


	var $tables = $( '.main' ).find( 'table' );
	if($tables.length ) {
		require(['tablescroll'], function() {
				$tables.tableScroll();
		});
	}

} );