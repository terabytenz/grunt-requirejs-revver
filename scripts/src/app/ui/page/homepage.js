define( ['jquery', 'twitter', 'app/ui/mediaqueries/mediaqueries', 'app/ui/rotator/homepage', 'evensteven'], function ( $, Twitter, MediaQueries, HomepageRotator ) {

	'use strict';

	return {
		init: function () {
			this._initTwitter();
			this._initRotator();
			this._initCarousel();
			this._initEqualisation();
			this._initPositioningStatement();
		},
		_initPositioningStatement: function () {
			var positioningStatement = $( '.pod-positioning' );
			if ( positioningStatement.length > 0 ) {
				var linkElement = positioningStatement.find( '.pod-positioning-body a' ).last();
				var linkUrl = linkElement.attr( 'href' );
				if ( linkUrl ) {
					positioningStatement.hover( 
						function () {
							$( this ).css( 'cursor', 'pointer' );
							linkElement.css( 'text-decoration', 'underline' );
						},
						function () {
							linkElement.css( 'text-decoration', 'none' );
						}
					);
					positioningStatement.on( 'click', function () {
						document.location.href = linkUrl;
					} );
				}
			}
		},
		_initTwitter: function () {
			Twitter.init( 'Christchurch_NZ', 1, '.twitter-tweet' );
		},
		_initRotator: function () {
			if ( $( '.rotator-homepage-item' ).length ) {
				MediaQueries.register( [{
					queries: MediaQueries.queries["all"],
					shouldDegrade: true,
					match: function () {
						HomepageRotator.bind();
					}
				}] );
			}
		},
		_initCarousel: function () {

			if ( $( '.js-carousel-homepage' ).length ) {

				MediaQueries.register( [{
					queries: MediaQueries.queries["small-homepage-carousel-rotator"],
					shouldDegrade: false,
					match: function () {
						require( ['app/ui/carousel/homepage/small', 'brotator'], function ( CarouselSmall ) {
							$( document ).ready( function () {
								CarouselSmall.bind();
							});
						} );
					},
					unmatch: function () {
						require( ['app/ui/carousel/homepage/small', 'brotator'], function ( CarouselSmall ) {
							$( document ).ready( function () {
								CarouselSmall.unbind();
							} );
						} );
					}
				}, {
					queries: MediaQueries.queries["medium-homepage-carousel-rotator"],
					shouldDegrade: false,
					match: function () {
						require( ['app/ui/carousel/homepage/large', 'scrollitup'], function ( HomepageCarouselLarge ) {
							$( document ).ready( function () {
								HomepageCarouselLarge.bind( {
									itemWidth: 164,
									margin: 8,
									itemsPerView: 2
								} );
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/carousel/homepage/large', 'scrollitup'], function ( HomepageCarouselLarge ) {
							HomepageCarouselLarge.unbind();
						} );
						
					}
				}, {
					queries: MediaQueries.queries["large-homepage-carousel-rotator"],
					shouldDegrade: true,
					match: function () {
						require( ['app/ui/carousel/homepage/large', 'scrollitup'], function ( HomepageCarouselLarge ) {
							$( document ).ready( function () {
								HomepageCarouselLarge.bind( {
									itemWidth: 164,
									margin: 8,
									itemsPerView: 3
								} );
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/carousel/homepage/large', 'scrollitup'], function ( HomepageCarouselLarge ) {
							HomepageCarouselLarge.unbind();
						} );
					}
				}] );
			}
		},
		_initEqualisation: function () {

			if ( $( '.js-evensteven' ).length ) {

				MediaQueries.register( [{
					queries: MediaQueries.queries["medium"],
					shouldDegrade: true,
					match: function () {

						$( '.js-evensteven' ).evenSteven( {
							resize: true
						} );
					},
					unmatch: function () {
						$( '.js-evensteven' ).evenSteven( 'destroy' );
					}
				}]
				);
			}
		}
	};

} );