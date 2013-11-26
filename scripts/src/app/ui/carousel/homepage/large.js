define( ['jquery', 'scrollitup'], function ( $ ) {

	'use strict';

	var $carousel;
	var $viewport;
	var $items;

	return {
		bind: function ( options ) {
			var module = this;
			$carousel = $( '.js-carousel-homepage' );
			function atomicCarousel() {
				if ( !$( '.js-carousel-homepage' ).data( 'carousel' ) ) {
					module.setData();
					$viewport = $carousel.find( '.pod-carousel-viewport' );
					$items = $viewport.find( '.js-carousel-item' );
					$carousel.scrollItUp( {
						next: '.btn-direction-next',
						previous: '.btn-direction-prev',
						itemsWrapper: '.js-carousel-content',
						items: '.js-carousel-item',
						viewport: '.pod-carousel-viewport',
						lazyLoad: true,
						responsiveConfig: options
					} );
				} else {
					setTimeout( atomicCarousel, 50 );
				}
			}

			atomicCarousel();
		},

		unbind: function () {
			this.removeData();
			$carousel.scrollItUp( 'destroy' );
		},

		setData: function () {
			$carousel.data( 'carousel', 'true' );
		},

		removeData: function () {
			$carousel.removeData( 'carousel' );
		}
	};

} );