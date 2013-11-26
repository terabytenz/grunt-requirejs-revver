define( ['jquery', 'brotator'], function ( $ ) {

	'use strict';

	return {
		$featureRotator: null,
		init: function () {

			var module = this;
			this.$featureRotator = $( '#js-rotator-feature' );

			function atomicRotator() {

				if ( !module.$featureRotator.data( 'rotator' ) ) {
					module.setData();
					module.$featureRotator.brotator( {
						content: '.js-rotator-feature-content',
						timeout: 8000,
						easing: 'easeInOutExpo',
						hasMenu: true,
						hasButtons: true,
						next: '.js-next',
						previous: '.js-prev',
						animationSpeed: 500,
						contentSetup: 'responsive',
						lazyloader: true,
						autorotate: false,
						animation: "slide",
						namespace: '/small-feature-rotator'
					} );
				} else {
					setTimeout( atomicRotator, 50 );
				}
			}
			atomicRotator();
		},
		destroy: function () {
			this.$featureRotator.brotator( 'destroy' );
			this.removeData();
		},
		setData: function () {
			this.$featureRotator.data( 'rotator', 'true' );
		},
		removeData: function () {
			this.$featureRotator.removeData( 'rotator' );
		}
	};
} );