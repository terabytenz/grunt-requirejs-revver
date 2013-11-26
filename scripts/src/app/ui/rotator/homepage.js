define(['jquery', 'brotator'], function($) {

	'use strict';

	return {
		$homepageRotator: null,
		bind: function() {
			this.$homepageRotator = $('.js-rotator-homepage');
			this.$homepageRotator.brotator({
				content: '.js-rotator-homepage-content',
				timeout: 8000,
				easing: 'easeInOutSine',
				contentSetup: 'responsive',
				hasMenu: false,
				hasButtons: true,
				next: '.js-next',
				previous: '.js-prev',
				animationSpeed: 500,
				lazyloader: true,
				namespace: '/homepage-rotator',
				animation: 'slide',
				autorotate: false
			});
		},
		unbind: function() {
			this.$homepageRotator.brotator('destroy');
		},
		startTimer: function() {
			this.$homepageRotator.trigger('start.timer.brotator');
		},
		stopTimer: function() {
			this.$homepageRotator.trigger('stop.timer.brotator');
		}
	};
});