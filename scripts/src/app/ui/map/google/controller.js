define( ['jquery', 'easing', 'pubsub', 'app/ui/map/google/gmap'], function ( $, easing, pubsub, GoogleMap ) {

	var module;
	var $gmapContainer;
	var $toggleMap;

	return {
		init: function ( id ) {
			module = this;
			$gmapContainer = $( ".g-map-container" );
			$gmapContainer.data( 'showOneCategory', '' );
			$toggleMap = $( '.js-map-toggle' );
			GoogleMap.init();
			this._initEvents();
			this._initSubscriptions();
			this._showMap( id );
		},
		_initEvents: function () {
			$(window).on('resize', $.throttle(250, this._adjustMapSize));
		},
		_initSubscriptions: function () {
			$.subscribe( '/googlemap/toggle', $.proxy( this._processSlideEvent, this ) );
			$.subscribe( '/googlemap/show-on-map', this._showOnMap );
			$.subscribe( '/googlemap/resize-container', this._adjustMapSize );
		},
		_showMap: function ( id ) {
			module._adjustMapSize( $gmapContainer );
			module._toggleSlide( id );
		},
		_processSlideEvent: function ( data ) {
			var id = data.ref;
			if ( $gmapContainer.is( ':visible' ) && id !== 0 ) {
				$.publish( '/googlemap/toggle-complete', {
					ref: id
				} );
				return;
			}
			this._toggleSlide( id );
		},
		_toggleSlide: function ( id ) {
			$gmapContainer.slideToggle( 500, function () {
				module._setTabState( id );
			} );
			if($toggleMap.text().indexOf('Open') > -1 || $toggleMap.text().indexOf('Loading') > -1) {
				module._scrollToMap();
			}
		},
		_setTabState: function ( id ) {
			if ( $gmapContainer.is( ':visible' ) ) {
				$toggleMap.parent().removeClass( "closed" ).addClass( "open" );
				$toggleMap.find( '.map-button-label' ).text( "Close Google Map" );
				$.publish( '/googlemap/toggle-complete', {
					ref: id
				} );
			} else {
				$toggleMap.parent().removeClass( "open" ).addClass( "closed" );
				$toggleMap.find( '.map-button-label' ).text( "Open Google Map" );
			}
		},
		_scrollToMap: function () {

			if ( $gmapContainer.is( ':visible' ) ) {
				$( 'html,body' ).animate( { scrollTop: $( '#js-nav-primary' ).scrollTop() }, 1000, 'easeInOutExpo', function () {
					if ( $( 'html' ).scrollTop() !== 0 ) {
						$( 'html,body' ).animate( { scrollTop: $( '#js-nav-primary' ).scrollTop() }, 1000, 'easeInOutExpo' );
					}
				} );
			}
		},
		_showOnMap: function ( e ) {
			e.preventDefault();
			var id = $( this ).data( "id" );
			$gmapContainer.slideDown( 900, function () {
				GoogleMap.showOnly( id );
				module._setTabState( id );
			} );
		},
		_adjustMapSize: function () {
			var $elem = $gmapContainer;
			// adjust width
			var width = $( window ).width();
			width = width - $elem.offset().left;
			width = width + 'px';

			if ( width ) {
				$elem.width( width );
			}

			// -- fixed height --
			var height = 400; // fixed height

			height = height + 'px';
			if ( height ) {
				$elem.height( height );
			}
			$.publish( '/googlemap/resize-map' );
		}
	};

} );