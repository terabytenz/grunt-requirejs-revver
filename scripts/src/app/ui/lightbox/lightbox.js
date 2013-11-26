define( ['jquery', 'colorbox'], function ( $ ) {

	'use strict';

	var module;

	return {
		$cboxContent: null,
		$colorbox: null,
		$cboxWrapper: null,
		$cboxClose: null,
		$cboxTitle: null,
		$cboxLoadedContent: null,
		$cboxDescription: null,
		init: function () {
			this._setVars();
			module = this;
			$( window ).on( 'resize', function () {
				$.colorbox.close();
			} );
		},

		onLoadProcessing: function () {
			module._addDescription.call( this );
		},

		onCompleteProcessing: function () {
			module._adjustContent.call( this );
			module._adjustWindow.call( this );
		},

		setTitle: function () {
			var $this = $( this );
			var youtubeId = $this.data( 'videoid' );
			var currentCaption = $this.data( 'caption' );
			if ( currentCaption == "" && youtubeId != null ) {
				$.getJSON( 'http://gdata.youtube.com/feeds/api/videos/' + youtubeId + '?v=2&alt=jsonc', function ( data, status, xhr ) {
					currentCaption = jQuery.trim( data.data.description ).substring( 0, 145 ).split( " " ).slice( 0, -1 ).join( " " ) + "...";

					$this.find( '.youtube-description' ).attr( 'alt', currentCaption );
					$( '#cboxDescription' ).text( currentCaption );
					// data contains the JSON-Object below
				} );
				return currentCaption;
			}
			return $( this ).nextAll( '.js-lightbox-caption' ).text();
		},

		_addDescription: function () {
			var $cboxDescription = $( '#cboxDescription' );
			var description = $( this ).find( 'img' ).first().attr( 'alt' ) || '&nbsp;';
			var descriptionHtml = '<p id="cboxDescription">' + description + '</p>';
			if ( $cboxDescription.length > 0 ) {
				$cboxDescription.html( description );
			} else {
				module.$cboxContent.append( descriptionHtml );
				$cboxDescription = $( '#cboxDescription' );
			}
			module.$cboxDescription = $cboxDescription;
		},

		_adjustContent: function () {

			var heightTitle = module.$cboxTitle.outerHeight();
			var $loadedContent = $( '#cboxLoadedContent' );

			$loadedContent.css( {
				'margin-top': heightTitle
			} );

			module.$cboxLoadedContent = $( "#cboxLoadedContent" );

		},

		_adjustWindow: function () {
			var isGallery = $(this).closest('.js-lightbox-gallery').length;
			var heightLoadedContent = module.$cboxLoadedContent.outerHeight();
			var heightTitle = module.$cboxTitle.outerHeight();
			var descriptionText = module.$cboxDescription.text();
			var heightDescription = !$.trim( descriptionText ).length && !isGallery ? 0 : module.$cboxDescription.outerHeight( true );
			var heightTotal = heightLoadedContent + heightTitle + heightDescription;
			var heightColorbox = module.$colorbox.height();
			var topColorbox = module.$colorbox.css( 'top' );
			var topAdjust = ( heightTotal - heightColorbox ) / 2;
			var topTotal = parseFloat( topColorbox ) - topAdjust;

			module.$colorbox.height( heightTotal );
			module.$cboxWrapper.height( heightTotal );
			module.$colorbox.css( { 'top': String( topTotal ) + "px" } );

		},

		_setVars: function () {
			this.$cboxContent = this.$cboxContent || $( '#cboxContent' );
			this.$colorbox = this.$colorbox || $( '#colorbox' );
			this.$cboxWrapper = this.$cboxWrapper || $( '#cboxWrapper' );
			this.$cboxClose = this.$cboxClose || $( '#cboxClose' );
			this.$cboxTitle = this.$cboxTitle || $( '#cboxTitle' );
		}
	};
} );