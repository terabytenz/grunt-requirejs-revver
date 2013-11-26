define( ['jquery', 'app/ui/tradegallery/imagedata', 'app/ui/tradegallery/imagelibrary', 'app/util/utils', 'app/ui/lightbox/loader', 'evensteven'], function ( $, ImageLibraryData, ImageLibrary, Utils, LightboxLoader ) {

	var imageHolder;

	function init() {
		imageHolder = $( "#selected-images" );
		if ( imageHolder.length ) {
			addImages();
			imageHolder.on( 'click', '.js-media-item-btn', mediaButtonClick );
			$.publish( '/lazyload/loadimages', [imageHolder] );
			LightboxLoader.init();
			$('.main, .aside').evenSteven();
		}
	}

	function addImages() {
		var imageListHtml = "";
		ImageLibraryData.getList( function ( jsonList ) {
			var count = 0;
			var length = Utils.getObjectLength( jsonList );
			if ( !$.isEmptyObject( jsonList ) ) {
				imageListHtml += "<div class='listing-info'><div class='listing-info-current'><p>You have selected <strong class='js-image-number'>" + getImageCount( length ) + "</strong></p></div></div>";
				imageListHtml += "<div class='gallery-wrapper'><ul class='list-grid gallery self-clear'>";
				if ( jsonList !== null && !$.isEmptyObject( jsonList ) ) {
					for ( var key in jsonList ) {
						if ( jsonList.hasOwnProperty( key ) ) {
							count++;
							imageListHtml += buildImageItem( count, length, jsonList[key] );
						}
					}

				}
			} else {
				imageListHtml += "<div class='listing-info'><div class='listing-info-current'><p>You have no images selected</p></div></div>";
				imageListHtml += "<div class='gallery-wrapper'><ul class='list-grid gallery self-clear'>";
			}
			imageListHtml += "</ul></div>";

		} );
		imageListHtml && imageHolder.html( imageListHtml );
	}

	function buildImageItem( pos, length, imageData ) {
		var rows = Math.ceil( length / 3 );
		var itemHtml = "";

		itemHtml += "<li>";
		itemHtml += "<span class='js-lightbox-single js-lightbox-load'>";
		itemHtml += "<a class='gallery-figure figure-image figure-dark js-lightbox-image' title='" + imageData.name + "' href='" + imageData.src + "'>";
		itemHtml += "<img class='lazy-auto' width='190' height='100' alt='" + imageData.name + "' src='/images/placeholder/lazyload/landscape.png' data-original='" + imageData.src + ".width.190.ashx'>";
		itemHtml += "<noscript><img src='" + imageData.src + "'/></noscript><span class='media-magnify'>&#xe012;</span>";
		itemHtml += "</a>";
		itemHtml += "</span>";
		itemHtml += "<div class='gallery-item-body'>";
		itemHtml += "<h3 class='gallery-item-heading'>" + imageData.name + "</h3>";
		itemHtml += "<dl class='list-stacked gallery-item-detail'><dd>" + imageData.description + "</dd></dl>";
		itemHtml += "<a data-alttext='Add' data-alttitle='Add to selection' title='Remove from selection' href='#' class='js-media-item-btn selected link-cta-minus'";
		itemHtml += " data-mediafile='" + imageData.filename + "' data-medianame='" + imageData.name + "' data-mediasrc='" + imageData.src + "' data-mediadescription='" + imageData.description + "'>Remove</a>";
		itemHtml += "</div>";
		itemHtml += "</li>";

		return itemHtml;
	}

	function mediaButtonClick( event ) {
		event.preventDefault();
		var button = $( this );
		var mediaItem = {
			filename: button.attr( "data-mediaFile" ),
			src: button.attr( "data-mediaSrc" ),
			name: button.attr( "data-mediaName" ),
			description: button.attr('data-mediaDescription')
		};
		button.hasClass( "selected" ) ? ImageLibraryData.removeMediaItem( mediaItem ) : ImageLibraryData.addMediaItem( mediaItem );
		ImageLibrary.toggleButtonState( button );
		button.closest( 'li' ).remove();
		updateImageSummary();
		//window.location.href = window.location.pathname;
	}

	function updateImageSummary() {
		ImageLibraryData.getList( function ( jsonList ) {
			var length = Utils.getObjectLength( jsonList );
			$( '.js-image-number' ).html( getImageCount( length ) );
		} );
	}

	function getImageCount( length ) {
		return length + " image" + ( ( length == 0 || length > 1 ) ? "s" : "" );
	}

	return {
		init: init
	};
} );