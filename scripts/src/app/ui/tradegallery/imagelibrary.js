define( ['jquery', 'app/ui/tradegallery/imagedata', 'app/ui/mediaqueries/mediaqueries', 'app/util/utils', 'pubsub'], function ( $, ImageLibraryData, MediaQueries, Utils ) {

	var mainContent;
	var status;
	var requestBtn;

	function init() {

		mainContent = $( "#main-content" );
		status = $( "#selection-status" ).find( "span" );
		requestBtn = $( "#request-images" );
		var mediaData = mainContent;

		initSubscriptions();
		checkButtons( mediaData );
		updateCount();
		equalise();

		//  Button functions and state changes
		mainContent.on( "click", ".js-media-item-btn", mediaButtonClick );
		requestBtn.on( "click", function ( event ) {
			if ( $( this ).is( ".disabled" ) ) {
				event.stopPropagation();
				event.preventDefault();
			}
		} );
	}

	function initSubscriptions() {
		$.subscribe( '/imagegallery/buttons/init', checkButtons );
	}

	function checkButtons( data ) {
		ImageLibraryData.getList( function ( jsonList ) {
			var items = $( data ).find( "li" );
			if ( items.length > 0 && jsonList !== null && !$.isEmptyObject( jsonList ) ) {
				for ( var i = 0; i < items.length; i++ ) {
					var item = items[i];
					var itemBtn = $( item ).find( ".js-media-item-btn" );
					var src = itemBtn.attr( "data-mediaSrc" );
					for ( var key in jsonList ) {
						if ( jsonList.hasOwnProperty( key ) ) {
							if ( src === jsonList[key].src ) {
								toggleButtonState( itemBtn );
							}
						}
					}
				}
			}
		} );
	}

	function updateCount() {
		var length;
		ImageLibraryData.getList( function ( jsonList ) {
			if ( jsonList !== null && !$.isEmptyObject( jsonList ) ) {
				length = Utils.getObjectLength( jsonList );
				status.text( length );
				requestBtn.removeClass( "disabled" );
			} else {
				status.text( "0" );
				requestBtn.addClass( "disabled" );
			}
		} );
	}
	function equalise() {
		if ( $( '.gallery .gallery-item-body' ).length ) {

			MediaQueries.register( [{
				queries: MediaQueries.queries["medium"],
				shouldDegrade: true,
				match: function () {
					require( ['evensteven'], function ( $ ) {
						$( '.gallery .gallery-item-body' ).evenSteven( {
							resize: true
						} );
					} );

				},
				unmatch: function () {
					require( ['evensteven'], function ( $ ) {
						$( '.gallery .gallery-item-body' ).evenSteven( 'destroy' );
					} );
				}
			}]
				);
		}
	}

	function mediaButtonClick( event ) {

		event.preventDefault();
		var button = $( this );

		var mediaItem = {
			filename: button.attr( "data-mediaFile" ).replace( "'", "" ),
			src: button.attr( "data-mediaSrc" ),
			name: button.attr( "data-mediaName" ),
			description: button.attr('data-mediaDescription')
		};
		var ogBtn = mainContent.find( 'a[data-mediaFile="' + mediaItem.filename + '"]' );

		!button.hasClass( "selected" ) && ImageLibraryData.addMediaItem( mediaItem );
		button.hasClass( "selected" ) && ImageLibraryData.removeMediaItem( mediaItem );
		toggleButtonState( button );
		(button.parents( '#colorbox' ).length && ogBtn.length ) && toggleButtonState( ogBtn );
		updateCount();
	}

	function toggleButtonState( button ) {
		var ogText = button.text(),
			ogTitle = button.attr( "title" ),
			altText = button.attr( "data-altText" ),
			altTitle = button.attr( "data-altTitle" );


		// TOGGLE VISUAL STATE AND UPDATE TEXT AND TOOLTIP
		button.toggleClass( "selected" );
		button.toggleClass( 'link-cta-plus' );
		button.toggleClass( 'link-cta-minus' );
		button.text( altText ).attr( "title", altTitle );
		button.attr( "data-altText", ogText ).attr( "data-altTitle", ogTitle );
	}

	return {
		init: init,
		checkButtons: checkButtons,
		toggleButtonState: toggleButtonState
	};
} );