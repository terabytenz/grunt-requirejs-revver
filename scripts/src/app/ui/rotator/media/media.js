define(['jquery', 'brotator', 'app/ui/mediaqueries/mediaqueries', 'app/ui/lazyload/lazyload', 'app/ui/rotator/media/tab', 'app/ui/video/video'], function ($, brotator, MediaQueries, LazyLoad, MediaTab, MediaVideo) {

	'use strict';

	var MediaRotator = {
		initRotator: function () {
			$('#js-feature-gallery').brotator({
				content: '.js-rotator-content',
				menu: '.js-media-menu',
				menuItem: '.js-media-item',
				menuClick: true,
				timeout: 8000,
				easing: 'easeInOutSine',
				hasMenu: true,
				hasButtons: true,
				next: '.js-next',
				previous: '.js-prev',
				animationSpeed: 500,
				lazyloader: true,
				namespace: '/media-gallery-rotator',
				autorotate: false
			});
		},
		initMediaQueries: function () {
			MediaQueries.register({
				queries: MediaQueries.queries["large"],
				shouldDegrade: true,
				match: function () {
					require(['scrollitup'], function ($) {
						$(document).ready(function () {
							this.$carousels = $('.js-rotator-media-preview');
							this.$carousels.scrollItUp({
								next: '.btn-direction-next',
								previous: '.btn-direction-prev',
								itemsWrapper: '.js-media-menu',
								items: '.js-media-item',
								viewport: '.rotator-media-carousel-viewport',
								lazyLoad: true,
								setup: 'responsive',
								responsiveConfig: {
									itemWidth: 100,
									margin: 20,
									itemsPerView: 6
								}
							});
						});
					});
					LazyLoad.loadImages($('.rotator-media-preview').find('.rotator-media-item').find('[data-original]'));
				}
			});
		}
	};

	MediaRotator.initMediaQueries();
	MediaTab.init();
	MediaVideo.initRotatorVideo();
	MediaRotator.initRotator();

});