define( ['jquery', 'pubsub'], function ( $ ) {

	'use strict';

	return {
		_$button: null,
		_hasMore: true,
		init: function () {
			this._$button = $( '.js-listing-infinite-btn' );
			this._initEvents();
			this._initSubscriptions();
		},
		_initEvents: function () {
			this._$button.on( 'click', { proxy: this }, this._processClick );
		},
		_initSubscriptions: function () {
			$.subscribe( '/pagination/url', $.proxy( this._showMore, this ) );
			$.subscribe( '/listing/complete', $.proxy( this._processNewContentAdded, this ) );
		},
		_updateTextLoading: function () {
			this._$button.text( 'Loading...' );
		},
		_processClick: function ( event ) {
			event.preventDefault();
			event.data.proxy._updateTextLoading();
			event.data.proxy._publishNextEvent();
		},
		_publishMoreEvent: function ( url ) {
			$.publish( '/listing/more', [{
				url: url
			}] );
		},
		_publishNextEvent: function () {
			$.publish( '/pagination/next' );
		},
		_showMore: function ( data ) {
			if ( data.url === -1 ) {
				return;
			}
			this._hasMore = data.hasMore;
			this._publishMoreEvent( data.url );
		},
		_processNewContentAdded: function () {
			if ( !this._hasMore ) {
				this._hideButton();
				this._addEndMessage();
				return;
			}
			this._showButton();
		},
		_addEndMessage: function () {
			this._$button.after( '<p class="bravo heading text-center">There are no more results to show</p>' );
		},
		_hideButton: function () {
			this._$button.fadeOut( 200 );
		},
		_showButton: function () {
			this._$button.text( '+ Show More' );
			this._$button.fadeIn( 200 );
		}
	};
} );