define( ['jquery', 'pubsub', 'app/ui/lazyload/lazyload' ], function ( $, pubsub, LazyLoad ) {

	'use strict';

	return {

		_id: Math.floor( Math.random() * ( 1000 - 1 ) + 1 ),

		init: function () {
			this._initSubscriptions();
		},

		_initSubscriptions: function () {
			$.subscribe( '/listing/more', $.proxy( this._processMore, this ) );
			$.subscribe( '/ajax/ready/' + this._id, $.proxy( this._processHtml, this ) );
		},

		_processMore: function ( data ) {
			$.publish( '/ajax/get', [{
				url: data.url,
				id: this._id
			}] );
		},

		_processHtml: function ( data ) {

			var listingData;

			if ( !data.html.length ) {
				return;
			}

			listingData = this._generateData( data.html );
			this._publishUpdateEvent( listingData );

			this._appendContent( data.html );

			this._postProcessContent();

			this._publishCompleteEvent();
		},

		_appendContent: function ( $html ) {

			$( '.js-pagination' ).last().after( $html );
		},

		_generateData: function ( html ) {
			var $html = $( html );
			var start = $html.length ? parseInt( $html.attr( 'start' ), 10 ) : 0;
			var numberOfItems = parseInt( $html.attr( 'data-selection' ), 10 );
			var end = $html.length ? ( numberOfItems + start ) - 1 : 0;

			return {
				start: start,
				end: end
			};
		},

		_publishUpdateEvent: function ( data ) {
			$.publish( '/pagination/update', [data] );
		},

		_publishCompleteEvent: function () {
			$.publish( '/listing/complete' );
		},

		_postProcessContent: function () {
			var $listing = $( '.js-listing-infinite' ).last();
			LazyLoad.loadImages( $listing );
			$.publish( '/imagegallery/buttons/init', [$listing] );
			$.publish( '/lightbox/init', [{
				html: $listing
			}]);
			$.publish( '/availability/get' );
		}

	};
} );