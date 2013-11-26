define( ['jquery', 'colorbox', 'app/ui/lightbox/lightbox'], function ( $, colorbox, Lightbox ) {

	'use strict';

	return {
		init: function () {
			var config = {
				transition: 'none',
				current: 'Image {current} of {total}',
				maxWidth: '90%',
				rel: this.rel,
				title: Lightbox.setTitle,
				onLoad: Lightbox.onLoadProcessing,
				onComplete: Lightbox.onCompleteProcessing
			};

			Lightbox.init();
			if ( $( '.no-touch' ).find( 'body.mobile' ).length ) {
				$( '.js-lightbox-gallery' ).not( '.js-gallery-flickr' ).find( 'a' ).not( '.js-lightbox-caption' ).colorbox( config );
				$( '.js-gallery-flickr' ).on( 'click', this.openFlickrSeparately );
				return;
			}
			$( '.no-touch' ).find( '.js-lightbox-gallery' ).find( 'a' ).not( '.js-lightbox-caption' ).colorbox( config );

		},
		openFlickrSeparately: function () {
			var $thisFlickrGallery = $( this ).parents( '.js-gallery-flickr' ).first();
			var flickrUrl = $thisFlickrGallery.attr( 'data-seturl' );
			window.open( flickrUrl, '_blank' );
		},
		open: function () {
			$( this ).trigger( 'click' );
		}
	};

} );