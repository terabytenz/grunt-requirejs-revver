define( ['jquery', 'throttledebounce', 'brotator'], function ( $ ) {

	'use strict';

	var $carousel;
	var $viewport;
	var $items;

	return {
		bind: function () {
			var module = this;
			$carousel = $( '.js-carousel-homepage' );
			$viewport = $carousel.find( '.pod-carousel-viewport' );
			$items = $viewport.find( '.js-carousel-item' );
			function atomicCarousel() {
				if ( !$carousel.data( 'carousel' ) ) {
					module._setData();
					$carousel.brotator( {
						content: '.js-carousel-content',
						timeout: 8000,
						easing: 'easeInOutSine',
						contentSetup: 'responsive',
						animation: 'slide',
						hasMenu: false,
						hasButtons: true,
						next: '.btn-direction-next',
						previous: '.btn-direction-prev',
						animationSpeed: 500,
						lazyloader: true,
						namespace: '/homepage-small-carousel',
						autorotate: false
					} );
					module._setPodHeight();
					module._initResizeEvent();
				} else {
					setTimeout( atomicCarousel, 50 );
				}
			}

			atomicCarousel();
		},

		unbind: function () {
			$carousel.brotator( 'destroy' );
			this._removeResizeEvent();
			this._resetHeights();
			this._removeData();
		},

		_setPodHeight: function () {
			var width = $viewport.width();
			var height = this._getLargestPod();
			$viewport.css( 'padding-bottom', height / width * 100 + '%' );
		},

		_resetHeights: function () {
			$viewport.css( 'padding-bottom', '' );
		},

		_getLargestPod: function () {
			var tallest = 0;
			$items.each( function () {
				var $thisItem = $( this );
				if ( tallest < $thisItem.height() ) {
					tallest = $thisItem.height();
				}
			} );
			return tallest;
		},

		_initResizeEvent: function () {
			$( window ).on( 'resize', $.proxy( $.throttle( 250, this._setPodHeight ), this ) );
		},

		_removeResizeEvent: function () {
			$( window ).off( 'resize', this._setPodHeight );
		},
		_setData: function () {
			$carousel.data( 'carousel', 'true' );
		},
		_removeData: function () {
			$carousel.removeData( 'carousel' );
		}
	};
} );