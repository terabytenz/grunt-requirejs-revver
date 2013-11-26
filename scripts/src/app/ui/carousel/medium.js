define( ['jquery', 'brotator', 'scrollitup', 'evensteven', 'ajaxInclude'], function ( $ ) {

	'use strict';

	return {
		$carousels: null,
		initEqualisation: function ( options ) {

			this.$carousels = $( '.js-carousel' );
			var plugin = this.$carousels.data( 'plugin_evenSteven' );

			if ( !plugin ) {
				if ( !this.$carousels.length ) {
					this.initLoad( options );
					return;
				}
				this.equalisePods( options.columns );
			} else {
				plugin.update( {
					columns: options.columns
				} );
			}
		},
		initLoad: function ( options ) {
			var thisModule = this;
			$( '.carousel' ).parent( '.lazy-content' ).on( 'ajaxInclude', function () {
				setTimeout( function () {
					thisModule.checkForImages();
					if ( options && options.init === 'rotator' ) {
						thisModule.initRotator();
					} else {
						thisModule.initEqualisation( options );
					}
				}, 100 );
			} );
		},
		initRotator: function () {
			this.$carousels = $( '.js-carousel' );
			if ( !this.$carousels.length ) {
				this.initLoad( {
					init: 'rotator'
				} );
			} else {
				//Init rotator
				$( '.js-carousel' ).brotator( {
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
					namespace: '/medium-carousel',
					autorotate: false
				} );
			}
			this.setData();
		},
		checkForImages: function () {
			if ( $( '.js-carousel-lazy' ).find( '.carousel-wrapper' ).length ) {
				$.publish( '/lazyload/loadimages', [$( '.js-carousel-lazy' )] );
			}
		},
		setData: function () {
			this.$carousels.data( 'carousel', 'true' );
		},
		removeData: function () {
			this.$carousels.removeData( 'carousel' );
		},
		equalisePods: function ( columns ) {
			this.$carousels.evenSteven( {
				columns: columns,
				resize: true
			} );
		},
		destroy: function () {
			this.$carousels.each( function () {
				$( this ).brotator( 'destroy' );
			} );
			this.$carousels.each( function () {
				$( this ).evenSteven( 'destroy' );
			} );
			this.removeData();
		}
	};
} );