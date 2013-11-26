define( ['jquery', 'lazyload', 'ajaxInclude', 'lazyscroll'], function ( $ ) {

	'use strict';

	var module;
	var contentClass = '.lazy-content';
	var imagesClass = '.lazy-auto';
	var $lazyLoadContent;
	var $lazyLoadImages;

	return {
		init: function () {
			module = this;
			$lazyLoadContent = $( contentClass );
			$lazyLoadImages = $( imagesClass );

			if ( $lazyLoadImages.length ) {
				this.loadImages();
			}
			if ( $lazyLoadContent.length ) {
				this.loadContent();
			}

			this._initSubscriptions();
		},
		loadContent: function ( $html ) {
			$html = $html instanceof jQuery ? $html : $( $html );
			if ( $html.length ) {
				var $content = $html.find( contentClass );
				this.content( $content );
				return;
			}
			this.content( $lazyLoadContent );
		},
		loadImages: function ( $html ) {
			module = module || this;
			$html = $html instanceof jQuery ? $html : $( $html );
			if ( $html.length ) {
				var $images = $html.find( imagesClass );
				module._getImages( $images );
				return;
			}
			module._getImages( $lazyLoadImages );
		},
		_initSubscriptions: function () {
			$.subscribe( '/lazyload/loadimages', this.loadImages );
		},
		_getImages: function ( $images ) {

			if ( !$images || !$images.length ) {
				return;
			}

			$images.filter( function () {
				var $thisImg = $( this );
				return this.src.indexOf( $thisImg.attr( 'data-original' ) ) === -1;
			} ).lazyload( {
				effect: "fadeIn",
				threshold: 100,
				effectspeed: 100
			} );
		},
		content: function ( $elms ) {
			$elms.lazyScroll( {
				callback: function () {
					this.$element.ajaxInclude();
					//console.log( 'lazyscroll', this.$element[0] );
				}
			} );
		}
	};

} );
