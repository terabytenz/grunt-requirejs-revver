//YouTube iframe player API docs https://developers.google.com/youtube/iframe_api_reference
define( ['jquery'], function ( $ ) {

	'use strict';

	return {
		loadAPI: function () {
			// This code loads the IFrame Player API code asynchronously.
			var tag = document.createElement( 'script' );
			tag.src = "http://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName( 'script' )[0];
			firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
		},

		setPlayerToLoad: function ( $target ) {
			$target.addClass( 'js-youtube-player-load' );
		},

		unsetPlayerToLoad: function ( $target ) {
			$target.removeClass( 'js-youtube-player-load' );
		},

		loadVideo: function () {
			var player;
			var $player = $('.js-youtube-player-load');
			var playerId = $player.attr( 'id' );
			var videoId = $player.attr( 'data-videoid' );
			var width = $player.width();
			var height = $player.height();
			var playOnLoad = $player.attr( 'data-play-on-load' ) === 'true' ? 1 : 0;

			player = new YT.Player( playerId, {
				height: height,
				width: width,
				videoId: videoId,
				events: {
					"onReady": this.readyToPlay
				},
				playerVars: {
					autoplay: playOnLoad,
					rel: 0
				}
			} );

			$( '.js-youtube-player-load' ).data( 'player', player );

			this.unsetPlayerToLoad( $( '.js-youtube-player-load' ) );
		},

		readyToPlay: function ( event ) {

		},

		stopVideo: function ( player ) {
			player.stopVideo();
		}
	};
} );