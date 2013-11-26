define( ['jquery', 'enquire'], function ( $, enquire ) {

	'use strict';

	var shouldDegrade;

	return {
		queries: {
			"all": "screen",
			"small": "screen and (max-width: 449px)",
			"medium-max": "screen and (max-width: 449px)",
			"medium": "screen and (min-width: 450px)",
			"medium-large-max": "screen and (max-width: 639px)",
			"medium-large": "screen and (min-width: 640px)",
			"small-homepage-carousel-rotator": "screen and (max-width: 449px)",
			"medium-homepage-carousel-rotator": "screen and (min-width: 450px) and (max-width: 639px)",
			"large-homepage-carousel-rotator": "screen and (min-width: 640px)",
			"carousel-rotator": "screen and (min-width: 450px) and (max-width: 1023px)",
			"carousel-medium": "screen and (min-width: 450px) and (max-width: 767px)",
			"carousel-medium-large": "screen and (min-width: 768px) and (max-width: 899px)",
			"carousel-large": "screen and (min-width: 900px) and (max-width: 1023px)",
			"carousel-widescreen": "screen and (min-width: 1024px)",
			"large": "screen and (min-width: 900px)",
			"rotator-medium": "screen and (min-width: 450px) and (max-width: 899px)",
			"extra-large": "screen and (min-width: 1200px)",
			"nav-small": "screen and (max-width: 639px)",
			"nav-large": "screen and (min-width: 640px)",
			"listing-search-medium": "screen and (max-width: 639px)",
			"availability": "screen and (max-width: 550px)"
		},
		init: function () {
			//We only want to fire mediaqueries for mediaquery capable browsers. i.e. Not Old IE which gets a fixed view
			shouldDegrade = !$( '.oldie' ).length;
			this._initNav();
			this._initCarousel();
			this._initFeatureRotator();
			this.initResponsiveTables();
			this._initFeatureMap();
			this._initGoogleMap();
		},
		register: function ( config ) {
			if ( Object.prototype.toString.call( config ) === '[object Array]' ) {
				for ( var i = 0; i < config.length; i++ ) {
					var currentConfig = config[i];
					this._addToHandler( currentConfig );
				}
			} else {
				this._addToHandler( config );
			}

		},
		_initFeatureRotator: function () {
			if ( $( '.js-rotator-youtube' ).length ) {
				this.register( {
					queries: this.queries["extra-large"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/video/video'], function ( Media ) {
							$( document ).ready( function () {
								Media.bindRotatorVideoEvent( $( '.js-youtube-pod' ) );
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/video/video'], function ( Media ) {
							Media.unbindRotatorVideoEvent( $( '.js-youtube-pod' ) );
						} );
					}
				} );
			}

			if ( $( '#js-rotator-feature' ).length ) {

				//Bind Small Feature Rotator
				this.register( {
					queries: this.queries["rotator-medium"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/rotator/feature-small'], function ( FeatureSmall ) {
							$( document ).ready( function () {
								FeatureSmall.init();
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/rotator/feature-small'], function ( FeatureSmall ) {
							FeatureSmall.destroy();
						} );
					}
				} );

				//Bind Large Feature Rotator
				this.register( {
					queries: this.queries["large"],
					shouldDegrade: true,
					match: function () {
						require( ['app/ui/rotator/feature-large'], function ( FeatureLarge ) {
							$( document ).ready( function () {
								FeatureLarge.init();
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/rotator/feature-large'], function ( FeatureLarge ) {
							FeatureLarge.destroy();
						} );
					}
				} );
			}
		},

		_initNav: function () {
			//Bind Small Nav
			this.register( [{
				//Small Nav
				queries: this.queries["nav-small"],
				shouldDegrade: shouldDegrade,
				match: function () {
					require( ['app/ui/nav/small'], function ( NavSmall ) {
						$( document ).ready( function () {

							function atomicNav() {
								if ( !$( '#js-nav-primary' ).data( 'nav' ) ) {
									NavSmall.init();
									NavSmall.bind();
								} else {
									setTimeout( atomicNav, 50 );
								}
							}

							atomicNav();
						} );
					} );
				},
				unmatch: function () {
					require( ['app/ui/nav/small'], function ( NavSmall ) {
						NavSmall.unbind();
					} );
				}
			}, {
				//Medium Nav
				queries: this.queries["medium-large"],
				shouldDegrade: true,
				match: function () {
					require( ['app/ui/nav/large'], function ( NavLarge ) {
						$( document ).ready( function () {

							function atomicNav() {
								if ( !$( '#js-nav-primary' ).data( 'nav' ) ) {
									NavLarge.init();
									NavLarge.bind();
								} else {
									setTimeout( atomicNav, 50 );
								}
							}

							atomicNav();
						} );
					} );
				},
				unmatch: function () {
					require( ['app/ui/nav/large'], function ( NavLarge ) {
						NavLarge.unbind();
					} );
				}
			}, {
				//Extra Large Nav
				queries: this.queries["extra-large"],
				shouldDegrade: shouldDegrade,
				match: function () {
					require( ['app/ui/nav/large'], function ( NavLarge ) {
						$( document ).ready( function () {
							NavLarge.init();
							NavLarge.bindNavWidescreen();
						} );
					} );
				},
				unmatch: function () {
					require( ['app/ui/nav/large'], function ( NavLarge ) {
						NavLarge.unbindNavWidescreen();
					} );
				}
			}] );
		},
		_initCarousel: function () {
			if ( $( '.carousel, .js-carousel' ).length ) {
				//Rotator Carousel
				this.register( [{
					queries: this.queries["carousel-rotator"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/carousel/medium'], function ( CarouselMedium ) {
							$( document ).ready( function () {

								function atomicCarousel() {
									if ( !$( '.js-carousel' ).data( 'carousel' ) ) {
										CarouselMedium.checkForImages();
										CarouselMedium.initRotator();
									} else {
										setTimeout( atomicCarousel, 50 );
									}
								}

								atomicCarousel();
							} );
						} );
					},
					unmatch: function () {

						require( ['app/ui/carousel/medium'], function ( CarouselMedium ) {
							CarouselMedium.destroy();
						} );

					}
				}, {
					//Medium Carousel
					queries: this.queries["carousel-medium"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/carousel/medium'], function ( CarouselMedium ) {
							$( document ).ready( function () {
								function atomicCarousel() {
									if ( !$( '.js-carousel' ).data( 'carousel' ) ) {
										CarouselMedium.checkForImages();
										CarouselMedium.initEqualisation( {
											columns: 2
										} );
									} else {
										setTimeout( atomicCarousel, 50 );
									}
								}
								atomicCarousel();
							} );
						} );
					}
				}, {
					//Medium Large Carousel
					queries: this.queries["carousel-medium-large"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/carousel/medium'], function ( CarouselMedium ) {
							$( document ).ready( function () {
								function atomicCarousel() {
									if ( !$( '.js-carousel' ).data( 'carousel' ) ) {
										CarouselMedium.checkForImages();
										CarouselMedium.initEqualisation( {
											columns: 4
										} );
									} else {
										setTimeout( atomicCarousel, 50 );
									}
								}
								atomicCarousel();
							} );
						} );
					}
				}, {
					//Large Carousel
					queries: this.queries["carousel-large"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/carousel/medium'], function ( CarouselMedium ) {
							$( document ).ready( function () {
								function atomicCarousel() {
									if ( !$( '.js-carousel' ).data( 'carousel' ) ) {
										CarouselMedium.checkForImages();
										CarouselMedium.initEqualisation( {
											columns: 2
										} );
									} else {
										setTimeout( atomicCarousel, 50 );
									}
								}
								atomicCarousel();
							} );
						} );
					}
				}, {
					//Widescreen Carousel
					queries: this.queries["carousel-widescreen"],
					shouldDegrade: true,
					match: function () {
						require( ['app/ui/carousel/wide'], function ( CarouselWide ) {
							$( document ).ready( function () {
								function atomicCarousel() {
									if ( !$( '.js-carousel' ).data( 'carousel' ) ) {
										CarouselWide.bind();
									} else {
										setTimeout( atomicCarousel, 50 );
									}
								}
								atomicCarousel();
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/carousel/wide'], function ( CarouselWide ) {
							CarouselWide.unbind();
						} );

					}
				}] );
			}
		},
		initResponsiveTables: function () {
			//Bind Responsive Tables for small screens
			var $tables = $( '.js-table-responsive' );
			if ( $tables.length ) {
				this.register( {
					queries: this.queries["availability"],
					shouldDegrade: shouldDegrade,
					match: function () {
						require( ['app/ui/table/table'], function ( Table ) {
							$( document ).ready( function () {
								Table.setResponsive( $tables );
							} );
						} );
					},
					unmatch: function () {
						require( ['app/ui/table/table'], function ( Table ) {
							$( document ).ready( function () {
								Table.destroyResponsive( $tables );
							} );
						} );

					}
				} );
			}
		},
		_initFeatureMap: function () {
			//Bind Feature Map
			if ( $( '.js-map-featured' ).length ) {
				this.register( {
					queries: this.queries["medium-large"],
					shouldDegrade: shouldDegrade,
					match: function () {

						require( ['app/ui/map/map'], function () {
							var Svg = require( 'app/ui/map/map' );
							var Pod = require( 'app/ui/map/pod' );
							$( document ).ready( function () {
								Svg.init();
								Pod.init();
							} );
						} );
					}
				} );
			}
		},

		_initGoogleMap: function () {
			this.register( {
				queries: this.queries["medium-large"],
				shouldDegrade: shouldDegrade,
				match: function () {
					require( ['app/ui/map/google/loader'], function ( GoogleMapLoader ) {
						$( document ).ready( function () {
							GoogleMapLoader.init();
						} );
					} );
				},
				unmatch: function () {
					require( ['app/ui/map/google/loader'], function ( GoogleLoader ) {
						$( document ).ready( function () {
							GoogleLoader.destroy();
						} );
					} );
				}
			} );
		},

		_addToHandler: function ( config ) {
			//Init JS mediaquery handlers using Enquire.JS
			enquire.register( config.queries, {
				match: config.match,
				unmatch: config.unmatch,
				deferSetup: true
			}, config.shouldDegrade ).listen( 250 );
		}
	};
} );