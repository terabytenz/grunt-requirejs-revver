define( ['jquery', 'app/ui/mediaqueries/mediaqueries', 'pubsub'], function ( $, MediaQueries ) {

	var module;

	return {
		openVideoInLightbox: false,
		init: function () {
			if ( !module ) {
				this._initSubscriptions();
			}
			module = module || this;
			var $lightboxLoad = $( '.js-lightbox-load' );
			if ( $( '.js-lightbox-load' ).length ) {

				$lightboxLoad.find( '.figure-caption' ).on( 'click', this._triggerMainImage );
				$lightboxLoad.find( '.js-lightbox-image' ).one( 'click', this._loadAssets );
			}
		},
		_initSubscriptions: function () {
			$.subscribe( '/lightbox/init', $.proxy( this.init, this ) );
		},
		_loadAssets: function ( event ) {
			event.preventDefault();
			var $thisImage = $( this );
			//Only run this the first time
			module._loadCompleted.call( $thisImage[0] );
		},
		_triggerMainImage: function ( event ) {
			event.preventDefault();
			$( this ).prevAll( '.js-lightbox-image' ).trigger( 'click' );
		},
		_initImageLightboxes: function () {
			if ( $( '.js-lightbox-single' ).length ) {
				require( ['app/ui/lightbox/single'], function ( SingleLightbox ) {
					SingleLightbox.init();
				} );
			}
			if ( $( '.js-lightbox-gallery' ).length ) {
				require( ['app/ui/lightbox/gallery'], function ( GalleryLightbox ) {
					GalleryLightbox.init();
				} );
			}
			if ( $( '.js-lightbox-video' ).length ) {

				MediaQueries.register( {
					queries: MediaQueries.queries["extra-large"],
					shouldDegrade: true,
					match: function () {
						require( ['app/ui/lightbox/gallery'], function ( VideoLightbox ) {
							this.openVideoInLightbox = true;
							VideoLightbox.init();
						} );
					},
					unmatch: function () {
						require( ['app/ui/lightbox/gallery'], function ( VideoLightbox ) {
							this.openVideoInLightbox = false;
							//VideoLightbox.destroy();
						} );
					}
				} );
			}
		},
		_loadCompleted: function () {

			var $thisImage = $( this );
			var $thisParent = $thisImage.closest( 'div' );
			var lightboxType = 'app/ui/lightbox/single';

			module._removeLoadEvents();

			if ( $thisParent.is( '.js-lightbox-video' ) ) {
				lightboxType = 'app/ui/lightbox/video';
			} else if ( $thisParent.is( '.js-lightbox-gallery' ) ) {
				lightboxType = 'app/ui/lightbox/gallery';
			}

			require( ['app/ui/lightbox/lightbox', lightboxType], function ( Lightbox, SpecificLightbox ) {
				Lightbox.init();
				module._initImageLightboxes();
				if ( lightboxType !== 'Video' || module.openVideoInLightbox === true ) {
					SpecificLightbox.init();
					SpecificLightbox.open.call( $thisImage[0] );
				} else {
					window.location.href = $thisImage.attr( 'href' );
				}
			} );

		},
		_removeLoadEvents: function () {
			$( '.js-lightbox-load' ).removeClass( 'js-lightbox-load' );
		}
	};


} );