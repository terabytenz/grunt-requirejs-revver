define( ['jquery', 'colorbox', 'app/ui/lightbox/lightbox' ], function ( $, colorbox, Lightbox) {

	'use strict';

	return {
		init: function () {
			Lightbox.init();
			var config = {
				transition: 'none',
				maxWidth: '90%',
				title: Lightbox.setTitle,
				onLoad: Lightbox.onLoadProcessing,
				onComplete: Lightbox.onCompleteProcessing
			};

			$( '.no-touch' ).find( '.js-lightbox-single' ).find( '.js-lightbox-image' ).colorbox( config );
		},
		open: function () {
			$( this ).trigger( 'click' );
		}
	};	

} );