define( ['jquery', 'app/ui/mediaqueries/mediaqueries', 'app/ui/lazyload/lazyload', 'app/util/detector', 'app/ui/form/search', 'phatfingaz'], function ( $, MediaQueries, LazyLoad, Detector, HeaderForm ) {

	'use strict';
	$( document ).ready( function () {

		MediaQueries.init();
		LazyLoad.init();
		$( '.js-hot' ).phatFingaz();
		Detector.init();
		HeaderForm.init();

		if ( $( '.js-lightbox-image' ).length ) {

			if ( $( '.no-touch' ).length ) {

				require( ['app/ui/lightbox/loader'], function ( LightboxLoad ) {
					LightboxLoad.init();
				} );

			} else {

				require( ['app/ui/lightbox/mobile'] );

				require( ['app/ui/video/video'], function ( Video ) {
					Video.bindRotatorVideoEvent( $( '.js-lightbox-video' ) );
				} );
			}

		}


		//Weather is lazy-loaded in .aside
		if ( $( '.aside' ).find( '.lazy-content' ).length ) {
			require( ['app/ui/sidebar/sidebar'], function ( Sidebar ) {
				Sidebar.init();
			} );
		}

	} );

} );