define( ['jquery', 'tabbery'], function ( $ ) {

	'use strict';

	return {
		$videoHolder: null,
		init: function() {
			$('.js-tabbery').tabbery();
			this.$videoHolder = $('#feature-video').find('.rotator-media-video-holder');
		}
	};
});