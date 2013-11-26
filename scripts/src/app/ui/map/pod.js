define( ['jquery', 'pubsub'], function ( $ ) {

	'use strict';
	
	var $pod;
	var $intro;

	return {
		init: function () {
			$pod = $( '#map-pod' );
			$intro = $( '#map-intro' );
			// $('.map-loading').hide();
			this._initSubscriptions();
		},

		getCurrentRegion: function () {
			return $pod.data( 'region' );
		},

		_initSubscriptions: function () {
			$.subscribe( '/map/update', $.proxy( this._transitionPod, this ) );

		},

		_transitionPod: function ( data ) {
			var proxy = this;
			this._hidePod( function () {
				proxy._updateText( data.url, data.heading, data.copy );
			} );
			setTimeout( function () {
				proxy._updateCurrent( data.region );
				proxy._updateImage( data.src, data.alt );
				proxy._showPod();
			}, 300 );
		},

		_updateCurrent: function ( region ) {
			$pod.data( 'region', region );
		},

		_updateImage: function ( src, alt ) {
			var img = $pod.find( 'img' )[0];
			img.src = src;
			img.alt = alt;
		},

		_updateText: function ( url, heading, copy ) {
			//Update heading and link
			var $heading = $pod.find( '.js-map-heading' );
			var $href = $( '#map-pod' ).find( '.pod-image' );
			$heading[0].href = url;
			$heading.text( heading );
			//Update copy
			$pod.find( '.js-map-body' ).html( copy );
			$href.attr( 'href', url );
		},

		_hideIntro: function () {
			if ( Modernizr.csstransitions ) {
				$intro.removeClass( 'is-visible' ).addClass( 'is-hidden' );
			} else {
				$intro
						.stop( true, true )
						.animate( 
							{ 'opacity': 0 },
							200,
							'easeInOutExpo'
						);
			}
		},

		_showPod: function () {
			if ( Modernizr.csstransitions ) {
				$pod.removeClass( 'is-hidden' ).addClass( 'is-visible' );
			} else {
				$pod.stop( true, true ).animate( {
					'opacity': 1
				}, 200, 'easeInOutExpo' );
				if ( isIE ) {
					$pod.find( '.figure-image' ).stop( true, true ).animate( {
						'opacity': 1
					}, 200, 'easeInOutExpo' );
				}
			}
		},

		_hidePod: function ( callback ) {
			if ( Modernizr.csstransitions ) {
				$pod.removeClass( 'is-visible' ).addClass( 'is-hidden' );
				callback();
			} else {
				$pod.stop( true, true ).animate( {
					'opacity': 0
				}, 200, 'easeInOutExpo', function () {
					if ( $pod.css( 'visibility' ) === 'hidden' ) {
						$pod.css( 'visibility', 'visible' );
					}
					callback();
				}
					);

				if ( isIE ) {
					$pod.find( '.figure-image' ).stop( true, true ).animate( {
						'opacity': 0
					}, 200, 'easeInOutExpo'
						);
				}
			}
		}
	};
} );