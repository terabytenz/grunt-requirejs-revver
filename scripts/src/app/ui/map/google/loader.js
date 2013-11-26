define( ['jquery', 'pubsub'], function ( $ ) {

	'use strict';

	var module = this;
	var $toggleMap;

	return {

		init: function () {
			module = this;
			$( document ).ready( function () {
				module._initButton();
				module._initEvents();
				module._checkForOpenMapUrls();
			} );
		},

		destroy: function () {
			$toggleMap.off( 'click' );
			$( '.js-show-on-map' ).off( 'click' );
		},

		_initButton: function () {
			$toggleMap = $( '.js-map-toggle' );
			$toggleMap.show();
		},

		_initEvents: function () {
			$toggleMap.on( 'click', this._toggleOrLoadMap );
			$( '.js-show-on-map' ).on( 'click', this._toggleOrLoadMap );
		},

		_checkForOpenMapUrls: function () {
			var id;
			var hash = window.location.hash;
			if ( hash === '#map-open' ) {
				$toggleMap.trigger( 'click' );
			}
			if ( hash.indexOf( '#map-open-' ) > -1 ) {
				id = hash.substring( '#map-open-'.length, hash.length );
				module._loadMapJs( id );
			}
		},

		_toggleOrLoadMap: function ( e ) {
			e.preventDefault();
			var $this = $( this );
			var id = $this.is( '.js-show-on-map' ) ? $this.data( 'id' ) : 0;
			//If button says 'Loading' means the map loading is in progress. Prevents double clicks and the yo-yo effect
			if ( $this.is( '.js-map-toggle' ) && $this.text().indexOf( 'Loading' ) > -1 ) {
				return false;
			}
			module._updateButtonText( $this );
			module._updateUrl( id );
			if ( $this.is( '.js-load-gmap' ) ) {
				module._loadMapJs( id );
				return;
			}
			$.publish( '/googlemap/toggle', [{ ref: id}] );

		},

		_updateUrl: function ( id ) {
			var url;

			if ( !id ) {
				return;
			}

			if ( $( '.g-map-container' ).is( ':visible' ) && id === 0 ) {
				url = '';
			} else {
				url = id === 0 ? '#map-open' : '#map-open-' + id;
			}
			window.location.hash = url;
		},

		_updateButtonText: function ( $thisButton ) {
			if ( $.trim( $thisButton.text() ).toLowerCase().search( "open" ) !== -1 ) {
				$toggleMap.find( '.map-button-label' ).text( "Loading Google Map" );
			}
		},

		_loadMapJs: function ( id ) {
			require( ['goog!maps,2'], function () {
				require( ['app/ui/map/google/controller'], function ( Map ) {
					$( '.js-load-gmap' ).removeClass( 'js-load-gmap' );
					Map.init( id );
				} );
			} );
		}

	};

} );