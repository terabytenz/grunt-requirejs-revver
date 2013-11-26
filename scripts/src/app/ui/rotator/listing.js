define(['jquery', 'brotator'], function($) {

	'use strict';

	return {
		$listingRotator: null,
		init: function() {
			this.$listingRotator = $('.js-rotator-listing');
			if (this.$listingRotator.find('.js-rotator-content').find('li').length > 1) {
				this.$listingRotator.brotator({
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
			this.$listingRotator.brotator('destroy');
		}
	};
});