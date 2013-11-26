define( ['jquery', 'scrollitup', 'ajaxInclude'], function ( $ ) {

	'use strict';

	return {
		$carousels: null,
		bind: function ( options ) {
			this.$carousels = $( '.js-carousel' );
			if ( !this.$carousels.length ) {
				this.initLoad( options );
				return;
			} else {
				this.$carousels.scrollItUp( {
					next: '.btn-direction-next',
					previous: '.btn-direction-prev',
					itemsWrapper: '.js-carousel-content',
					items: '.js-carousel-item',
					viewport: '.carousel-viewport',
					lazyLoad: true
				} );
			}
			this.setData();

		},
		unbind: function () {
			this.destroy();
		},
		checkForImages: function () {
			$.publish( '/lazyload/loadimages', [$( '.js-carousel-lazy' )] );
		},
		initLoad: function ( options ) {
			var module = this;
			module.checkForImages();
			$( '.carousel' ).parent( '.lazy-content' ).on( 'ajaxInclude', function () {
				module.checkForImages();
				require( ['app/ui/carousel/wide'], function ( CarouselWide ) {
					CarouselWide.bind();
				} );
			} );
		},
		setData: function () {
			this.$carousels.each( function () {
				$( this ).data( 'carousel', 'true' );
			} );
		},
		removeData: function () {
			this.$carousels.each( function () {
				$( this ).removeData( 'carousel' );
			} );
		},
		destroy: function () {
			this.$carousels.each( function () {
				$( this ).scrollItUp( 'destroy' );
			} );
			this.removeData();
		}
	};
} );