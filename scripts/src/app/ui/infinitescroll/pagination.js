define( ['jquery', 'pubsub'], function ( $, pubsub ) {

	'use strict';

	return {
		_$pagination: null,

		init: function () {
			this._getPagination();
			this._initSubscriptions();
			this._setupAjaxUrls();
		},

		_initSubscriptions: function () {
			$.subscribe( '/pagination/next', $.proxy( this._processNext, this ) );
			$.subscribe( '/pagination/update', $.proxy( this._processUpdate, this ) );
			$.subscribe( '/listing/complete', $.proxy( this._updateFirstPagination, this ) );
		},

		_processUpdate: function ( data ) {
			this._getPagination();
			this._updateValues( data );
			this._updateSelected();
			this._updatePageNumber();
			this._insertPagination();
		},

		_updateFirstPagination: function () {
			var itemCount = $('.js-listing-infinite').children('li').length;
			$('.js-pagination').first().find( '.js-pagination-end' ).text( itemCount );
		},

		_processNext: function () {
			var url = this._getNextPageUrl();
			var hasMore = this._hasMoreResults();
			var data = {
				url: url,
				hasMore: hasMore
			};
			this._publishUrlEvent( data );
		},

		_getPagination: function () {
			this._$pagination = $( '.js-pagination' ).eq( 0 ).clone();
			return this._$pagination;
		},

		_updateValues: function ( data ) {
			this._$pagination.find( '.js-pagination-start' ).text( data.start );
			this._$pagination.find( '.js-pagination-end' ).text( data.end );
		},

		_insertPagination: function () {
			$( '.js-listing-infinite' ).last().after( this._$pagination );
		},

		_getNextPageUrl: function () {
			var $pages = $( '.js-pagination-pages' ).eq( 0 );
			var $selected = $pages.find( '.is-selected' );
			var nextPage = $selected.closest( 'li' ).next( 'li' ).find( 'a' )[0];

			return nextPage != undefined ? nextPage.href : -1;
		},

		_hasMoreResults: function () {
			var $pages = $( '.js-pagination-pages' ).eq( 0 );
			return !!$pages.find( '.is-selected' ).closest( 'li' ).next().next().length;
		},

		_getPageSize: function () {
			var url = this._$pagination.find( '.js-pagination-pages' ).attr( 'data-url' );
			var pageSizeString = url.substring( url.lastIndexOf( '/' ), url.length );
			return parseInt( /\d+/.exec( pageSizeString )[0], 10 );
		},

		_getPageNumberFromUrl: function ( href ) {
			var matches = /PageNumber=\d+/.exec( href );
			if ( !matches ) {
				matches = /page=\d+/.exec( href );
			}
			if ( !matches ) {
				return 1;
			}
			return /\d+/.exec( matches[0] )[0];
		},

		_getNextStartingPoint: function ( pageNumber ) {
			return ( pageNumber * this._getPageSize() ) - this._getPageSize() + 1;
		},

		_getNewUrl: function ( oldUrl ) {
			var url = this._$pagination.find( '.js-pagination-pages' ).attr( 'data-url' );
			var pageNumber = this._getPageNumberFromUrl( oldUrl );
			var nextStartingPoint = this._getNextStartingPoint( pageNumber );

			var reducedStringStage1 = url.substring( 0, url.lastIndexOf( '/' ) );
			var reducedStringStage2 = reducedStringStage1.substring( 0, reducedStringStage1.lastIndexOf( '/' ) );
			var queryString = '';
			if ( url.indexOf( '?' ) > 1 ) {
				queryString = url.substring( url.indexOf( '?' ) );
			}
			return reducedStringStage2 + '/' + nextStartingPoint + '/' + this._getPageSize() + queryString;
		},

		_setupAjaxUrls: function () {
			var module = this;
			var $pages = $( '.js-pagination-pages' ).eq( 0 );
			$pages.find( 'a' ).each( function () {
				var $thisLink = $( this );
				$thisLink.attr( 'href', module._getNewUrl( $thisLink.attr( 'href' ) ) );
			} );
		},

		_publishUrlEvent: function ( data ) {
			$.publish( '/pagination/url', [data] );
		},

		_updateSelected: function () {
			var $pages = $( '.js-pagination-pages' ).eq( 0 );
			var $selected = $pages.find( '.is-selected' );
			var $nextPage = $selected.closest( 'li' ).next( 'li' );

			$selected.removeClass( 'is-selected' );
			$nextPage.find( 'a' ).addClass( 'is-selected' );
		},

		_updatePageNumber: function () {
			var $pages = $( '.js-pagination-pages' ).eq( 0 );
			var $items = $pages.find( 'li' );
			var $selectedItem = $pages.find( '.is-selected' ).closest( 'li' );
			var newPage = parseInt( $items.index( $selectedItem ), 10 ) + 1;

			this._$pagination.find( '.js-pagination-page-number' ).text( newPage );
			this._$pagination.find( '.js-pagination-page-number' ).closest( ".js-pagination" ).addClass( 'hidden' );
		}

	};
} );