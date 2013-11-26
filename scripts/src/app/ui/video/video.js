define( ['jquery', 'app/ui/video/youtube'], function ( $, YouTubeVideo ) {

	'use strict';

	//Global YouTube API function. Called after the API has downloaded
	window.onYouTubeIframeAPIReady = $.proxy( YouTubeVideo.loadVideo, YouTubeVideo );

	return {
		init: function ( $playerElm ) {

			YouTubeVideo.setPlayerToLoad( $playerElm );

			if ( typeof YT != 'undefined' && typeof YT.Player != 'undefined' ) {
				YouTubeVideo.loadVideo();
			} else {
				YouTubeVideo.loadAPI();
			}
		},

		initRotatorVideo: function () {

			var $rotatorMedia = $( '.rotator-media' );
			$rotatorMedia.on( 'tabbery.click', '.js-tabbery-item', { module: this }, function ( event ) {
				event.data.module.loadVideo( $( this ).closest( '.rotator-media' ).find( '.js-youtube-player' ) );
			} );

			$rotatorMedia.on( 'tabbery.click', '.js-tabbery-item', { module: this }, function ( event ) {

				if ( this.href.indexOf( '#js-feature-gallery' ) > -1 ) {
					event.data.module._stopVideos.call( $( '.js-youtube-pod' )[0] );
				}

			} );

		},

		_initLightboxEvent: function () {
			var $lightboxes = $( '.js-lightbox-video' );
			$lightboxes.on( 'click', function () {
				module.loadVideo( $( this ).find( '.js-youtube-player' ) );
			} );
		},

		bindRotatorVideoEvent: function ( $playerPod ) {

			$playerPod.on( 'click', { module: this }, this.onClickRotatorVideoEvent );
			$playerPod.on( 'click', this._stopVideos );
		},

		unbindRotatorVideoEvent: function ( $playerPod ) {
			$playerPod.off( 'click', this.onClickRotatorVideoEvent );
		},

		onClickRotatorVideoEvent: function ( event ) {
			event.preventDefault();
			event.data.module._handleClick( $( this ) );
		},

		_handleClick: function ( $elm ) {
			this.stopTimer();
			this.loadVideo( $elm.find( '.js-youtube-player' ) );
		},

		_stopVideos: function () {
			var $playerPod = $( this );
			var $rotator = $playerPod.parents( '.rotator' ).first();
			var namespace = $rotator.data( 'namespace' );

			$.subscribe( namespace + '/state/updated', function () {
				var $player = $playerPod.find( '.js-youtube-player' );

				for ( var i = 0; $player.length > i; i++ ) {
					var $this = $( $player[i] );
					if ( $this.data( 'player' ) ) {
						YouTubeVideo.stopVideo( $this.data( 'player' ) );
					}
				}
				;
			} );
		},

		stopTimer: function () {
			$( '#js-rotator-feature' ).trigger( 'stop.timer.brotator' );
		},

		loadVideo: function ( $playerElm ) {
			require( ['app/ui/video/video'], function ( Video ) {
				$( document ).ready( function () {
					Video.init( $playerElm );
				} );
			} );
		}
	};

} );