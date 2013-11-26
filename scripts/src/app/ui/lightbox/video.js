define( ['jquery', 'colorbox', 'app/ui/lightbox/lightbox'], function ( $, colorbox, Lightbox ) {

	'use strict';

	return {
		init: function () {
			var config = {
				transition: 'none',
				iframe: true,
				innerHeight: '70%',
				innerWidth: '90%',
				maxWidth: '90%',
				title: Lightbox.setTitle,
				onLoad: Lightbox.onLoadProcessing,
				onComplete: Lightbox.onCompleteProcessing
			};

			Lightbox.init();

			$( '.js-lightbox-video' ).find( '.js-lightbox-image' ).colorbox( config );
		},
		open: function () {
			$( this ).trigger( 'click' );
		},
		destroy: function () {
			$( '.js-lightbox-video' )
				.find( '.js-lightbox-image' )
				.removeClass( 'cboxElement' )
				.removeData( 'colorbox' );
		}
	};

} );