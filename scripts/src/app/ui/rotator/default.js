define(['jquery', 'brotator'], function( $ ) {

	'use strict';

	return {
		$defaultRotator: null,
		init: function() {
			this.$defaultRotator = $('.js-rotator-default');
			if (this.$defaultRotator.find('.js-rotator-content').find('li').length > 1) {
				this.$defaultRotator.brotator({
					content: '.js-rotator-content',
					timeout: 8000,
					easing: 'easeInOutExpo',
					hasMenu: true,
					hasButtons: true,
					next: '.js-next',
					previous: '.js-prev',
					animationSpeed: 500,
					contentSetup: 'responsive',
					lazyloader: true,
					animation: "slide",
					namespace: '/listing-rotator',
					autorotate: false
				});
			}
		},
		destroy: function() {
			this.$defaultRotator.brotator('destroy');
		}
	};
});