/// <reference path="~/scripts/lib/jquery-1.8.3.js" />
/*
* i-map
*
* Christchurch and Canterbury Tourism Google maps progressive enhancement layer
*
*/

// configure where your images are stored. (note the CSS files also refer to the same images)

var globalMap = null;
// -------------------------------- compress below this line --------------------------------

define( ['jquery', 'jqueryui', 'app/ui/map/google/markermanager'], function ( $ ) {

	var $gmapContainer;
	var mapLoaded = false;
	var module;

	function ShowRedZone( map ) {
		var coords1 = [
			new GLatLng( -43.529991, 172.634323 ),
			new GLatLng( -43.530060, 172.634247 ),
			new GLatLng( -43.530041, 172.634171 ),
			new GLatLng( -43.530602, 172.633484 ),
			new GLatLng( -43.530762, 172.633453 ),
			new GLatLng( -43.530861, 172.633438 ),
			new GLatLng( -43.530941, 172.633255 ),
			new GLatLng( -43.531010, 172.633255 ),
			new GLatLng( -43.531330, 172.633301 ),
			new GLatLng( -43.531891, 172.633713 ),
			new GLatLng( -43.531891, 172.633896 ),
			new GLatLng( -43.531971, 172.633896 ),
			new GLatLng( -43.531971, 172.635193 ),
			new GLatLng( -43.531712, 172.635193 ),
			new GLatLng( -43.531712, 172.635773 ),
			new GLatLng( -43.532471, 172.635773 ),
			new GLatLng( -43.532471, 172.636536 ),
			new GLatLng( -43.534191, 172.636566 ),
			new GLatLng( -43.534302, 172.636703 ),
			new GLatLng( -43.535061, 172.636703 ),
			new GLatLng( -43.535061, 172.636963 ),
			new GLatLng( -43.535320, 172.636963 ),
			new GLatLng( -43.535271, 172.639664 ),
			new GLatLng( -43.535061, 172.639664 ),
			new GLatLng( -43.535080, 172.640137 ),
			new GLatLng( -43.534821, 172.640427 ),
			new GLatLng( -43.535091, 172.640793 ),
			new GLatLng( -43.535061, 172.640884 ),
			new GLatLng( -43.535252, 172.641068 ),
			new GLatLng( -43.535252, 172.642563 ),
			new GLatLng( -43.533051, 172.642548 ),
			new GLatLng( -43.533070, 172.642136 ),
			new GLatLng( -43.533150, 172.642136 ),
			new GLatLng( -43.533131, 172.640656 ),
			new GLatLng( -43.532021, 172.640640 ),
			new GLatLng( -43.532021, 172.641953 ),
			new GLatLng( -43.530972, 172.641953 ),
			new GLatLng( -43.530972, 172.639771 ),
			new GLatLng( -43.530861, 172.639542 ),
			new GLatLng( -43.530861, 172.639175 ),
			new GLatLng( -43.530621, 172.639175 ),
			new GLatLng( -43.530621, 172.638504 ),
			new GLatLng( -43.530861, 172.638504 ),
			new GLatLng( -43.530861, 172.638016 ),
			new GLatLng( -43.529930, 172.638000 ),
			new GLatLng( -43.529930, 172.636703 ),
			new GLatLng( -43.530209, 172.636703 ),
			new GLatLng( -43.530209, 172.636581 ),
			new GLatLng( -43.529938, 172.636581 ),
			new GLatLng( -43.529911, 172.634476 ),
			new GLatLng( -43.529991, 172.634323 )
		],
			coords2 = [
				new GLatLng( -43.529812, 172.636703 ),
				new GLatLng( -43.529812, 172.638016 ),
				new GLatLng( -43.529861, 172.638016 ),
				new GLatLng( -43.529854, 172.638657 ),
				new GLatLng( -43.529781, 172.638641 ),
				new GLatLng( -43.529789, 172.639557 ),
				new GLatLng( -43.528812, 172.639542 ),
				new GLatLng( -43.527557, 172.639542 ),
				new GLatLng( -43.527561, 172.639252 ),
				new GLatLng( -43.526791, 172.639252 ),
				new GLatLng( -43.526791, 172.639557 ),
				new GLatLng( -43.525532, 172.639526 ),
				new GLatLng( -43.525551, 172.637024 ),
				new GLatLng( -43.525791, 172.637054 ),
				new GLatLng( -43.525810, 172.636703 ),
				new GLatLng( -43.526501, 172.636688 ),
				new GLatLng( -43.526505, 172.636505 ),
				new GLatLng( -43.526505, 172.636215 ),
				new GLatLng( -43.526043, 172.636230 ),
				new GLatLng( -43.526039, 172.636002 ),
				new GLatLng( -43.525543, 172.635971 ),
				new GLatLng( -43.525555, 172.635239 ),
				new GLatLng( -43.526485, 172.635239 ),
				new GLatLng( -43.526485, 172.634933 ),
				new GLatLng( -43.526657, 172.634949 ),
				new GLatLng( -43.526661, 172.634674 ),
				new GLatLng( -43.527309, 172.634689 ),
				new GLatLng( -43.527325, 172.635208 ),
				new GLatLng( -43.527702, 172.635223 ),
				new GLatLng( -43.527790, 172.635345 ),
				new GLatLng( -43.527668, 172.635666 ),
				new GLatLng( -43.527588, 172.635971 ),
				new GLatLng( -43.527405, 172.636368 ),
				new GLatLng( -43.527191, 172.636536 ),
				new GLatLng( -43.528717, 172.636536 ),
				new GLatLng( -43.528725, 172.635910 ),
				new GLatLng( -43.528507, 172.635910 ),
				new GLatLng( -43.528515, 172.635422 ),
				new GLatLng( -43.528740, 172.635406 ),
				new GLatLng( -43.528744, 172.635025 ),
				new GLatLng( -43.528847, 172.634949 ),
				new GLatLng( -43.528843, 172.634781 ),
				new GLatLng( -43.529202, 172.634720 ),
				new GLatLng( -43.529503, 172.634521 ),
				new GLatLng( -43.529800, 172.634247 ),
				new GLatLng( -43.529812, 172.634338 ),
				new GLatLng( -43.529648, 172.634506 ),
				new GLatLng( -43.529671, 172.634583 ),
				new GLatLng( -43.529789, 172.634659 ),
				new GLatLng( -43.529812, 172.636520 ),
				new GLatLng( -43.529655, 172.636520 ),
				new GLatLng( -43.529655, 172.636703 ),
				new GLatLng( -43.529812, 172.636703 )
			],
			poly1 = new GPolygon( coords1, "#ff0000", 2, 0.7, "#ff0000", 0.35 ),
			poly2 = new GPolygon( coords2, "#ff0000", 2, 0.7, "#ff0000", 0.35 );

		map.addOverlay( poly1 );
		map.addOverlay( poly2 );
	}

	// ================================================================
	// === Define the function thats going to process the JSON file ===
	ProcessJson = function ( doc ) {
		var theMap = FindMap( $gmapContainer[0] );
		// === Parse the JSON document ===
		var jsonData = eval( '(' + doc + ')' );
		theMap.data = jsonData; // save for later.
		DefaultView( theMap );
		// === add the category selection box & turn them on.===
		AddCategoriesNavigation( theMap );
		ShowAllCategories( theMap );
	};

	function ShowAllCategories( theMap ) {
		var selectedCategoryIDs = new Array;
		var index = 0;
		$( ".g-map-container .category input:checked" ).each( function () {
			//this.checked = true;
			selectedCategoryIDs[index] = $( this ).val();
			index++;
		} );
		ShowMarkers( theMap, selectedCategoryIDs );
	}

	function ShowOnly( id ) {
		var theMap = FindMap();

		// find the relevant markers.
		var markerArray = [];
		for ( var i = 0; i < theMap.data.locations.length; i++ ) {
			if ( theMap.data.locations[i].id == id ) {
				AddMarkerToArray( markerArray, theMap, theMap.data.locations[i] );
				break;
			}
		}

		if ( markerArray.length > 0 ) {
			$( ".g-map-container .category input" ).each( function () {
				this.checked = false;

			} );
			ShowMarkers( FindMap( null ), [] );

			// now show just the one
			if ( !theMap.markerManager )
				theMap.markerManager = new MarkerManager( theMap );

			theMap.markerManager.clearMarkers();
			theMap.markerManager.addMarkers( markerArray, 0, 17 );
			theMap.markerManager.refresh();
			DoMarkerClick( theMap, markerArray[0] );
		}
	}

	function ShowMarkers( theMap, categoryIndexes ) {
		///	<summary>
		///		1: ShowMarkers(theMap, categoryIDs)
		///	</summary>
		///	<param name="theMap" type="GMap2">
		///		1: theMap - a GMap2 object
		///	</param>
		///	<param name="categoryIDs" type="int[]">
		///		1: categoryIDs - A list of categories which will display
		///	</param>
		if ( !theMap.markerManager )
			theMap.markerManager = new MarkerManager( theMap );

		theMap.markerManager.clearMarkers();

		var markerArray = [];
		// === Plot the markers ===
		for ( var i = 0; i < theMap.data.locations.length; i++ ) {
			var showInCategory = -1;

			for ( var markerCatIndex = 0; markerCatIndex < theMap.data.locations[i].categories.length; markerCatIndex++ ) {
				for ( var selectedCatIndex = 0; selectedCatIndex < categoryIndexes.length; selectedCatIndex++ ) {
					if ( categoryIndexes[selectedCatIndex] == theMap.data.locations[i].categories[markerCatIndex] ) {
						showInCategory = categoryIndexes[selectedCatIndex];
						//Note: this marks the item with the icon of the LAST category of which it is a member.
					}
				}
			}
			if ( showInCategory > -1 )
				AddMarkerToArray( markerArray, theMap, theMap.data.locations[i] );
		}
		theMap.markerManager.addMarkers( markerArray, 0, 17 )
		theMap.markerManager.refresh();
	}

	function AddMarkerToArray( markerArray, theMap, pointData ) {
		var isPlatinum = pointData.membershipType == "platinum";
		var point = new google.maps.LatLng( pointData.lat, pointData.lng );
		var icon = new google.maps.Icon( baseIcon );
		var markerCategory = theMap.data.categories[pointData.markerCategory];

		icon.image = "/images/interface/map/markers/" + markerCategory.cssClass + ".png"; //theMap.data.categories[pointData.markerCategory].image;

		var marker = new google.maps.Marker( point, icon );
		marker.data = pointData;
		marker.cssClass = markerCategory.cssClass;
		marker.imageLo = "/images/Interface/map/markers/" + markerCategory.cssClass + ".png";
		marker.imageHi = "/images/Interface/map/markers/" + markerCategory.cssClass + ".png";

		google.maps.Event.addListener( marker, "mouseover", function () { marker.setImage( marker.imageHi ); } );
		google.maps.Event.addListener( marker, "mouseout", function () {
			if ( $( ".g-map-info.marker-" + marker.data.id ).length == 0 ) {
				marker.setImage( marker.imageLo );
			}
		} );
		google.maps.Event.addListener( marker, "click", function () { DoMarkerClick( theMap, marker ); } );

		markerArray.push( marker );
	}

	function DoMarkerClick( theMap, marker ) {
		// todo: load the info window with async call.
		//marker.openInfoWindow(BuildWindowContent($(data)));

		//temp:
		//marker.openInfoWindow("<h3>TODO: lookup content for NodeID:" + pointData.id + "</h3>");

		marker.setImage( marker.imageHi );

		if ( $( ".g-map-info" ).length == 0 )
			$( theMap.getContainer() ).append( "<div class='g-map-info'></div>" );

		$( ".g-map-info" ).data.marker = marker;

		$( ".g-map-info" ).attr( "class", "g-map-info width-wrap loading marker-" + marker.data.id + " " + marker.cssClass ).html( '<p class="g-map-info-loader">loading...</p>' );
		$( ".g-map-info" ).fadeIn();
		$.ajax( {
			url: "/" + marker.data.id + "?altTemplate=InfoPane",
			dataType: 'html',
			success: function ( html ) {
				$( ".g-map-info" ).removeClass( "loading" ).html( html );
				if ( $( '.g-map-info .inner' ).height() > 300 ) {
					$( '.g-map-info .inner' ).html( '<div class="overflow-catcher">' + $( '.g-map-info .inner' ).html() + '</div>' );
					$( '.g-map-info .inner' ).css( { 'padding': '35px 5px 5px 20px' } );
				}
			},
			error: function ( XMLHttpRequest, textStatus, errorThrown ) {
				$( ".g-map-info" ).html( "<div class='inner'><h2>Sorry, There was a problem loading this info.</h2><p>" + textStatus + "</p></div>" );
			}
		} );
		theMap.panTo( new google.maps.LatLng( marker.data.lat, marker.data.lng ) ); //? there should be a Glatlng stored in the GMarker ???
	}

	// Create GMap2 object with appropriate settings.

	function CreateGMap( _domTarget ) {

		if ( google.maps.BrowserIsCompatible() ) {
			var theMap = new google.maps.Map2( _domTarget );
			DefaultView( theMap )

			theMap.enableScrollWheelZoom();
			theMap.setMapType( G_NORMAL_MAP );

			/*
			theMap.addMapType(G_NORMAL_MAP);
			theMap.removeMapType(G_SATELLITE_MAP);
			theMap.removeMapType(G_HYBRID_MAP);
			theMap.addControl(new GMapTypeControl(true)); // true=short names
			*/
			AddCustomMapTypeButtons( theMap );

			var miniMapControl = new google.maps.OverviewMapControl( new google.maps.Size( 130, 200 ) );
			theMap.addControl( miniMapControl );

			/*gMap.addControl(new GLargeMapControl());*/
			AddCustomNavigation( theMap );

			// add events to clear the g-map-info if it exists.
			$( ".g-map-container div:not(.g-map-info)" ).mousedown( function () { ClearSelection( theMap ); } );
			$( ".g-map-container" ).on( "mousedown", ".category", function () { ClearSelection( theMap ); } );
			$( ".g-map-container" ).on( "click", ".g-map-info-close", function () { ClearSelection( theMap ); } );


			google.maps.Event.addListener( theMap, "zoomend", function ( a, b ) { ClearSelection( theMap ); } );

			$.publish( '/googlemap/resize-container' );

			return theMap;
		}
	}

	function ClearSelection( theMap ) {
		if ( $( ".g-map-info" ).length > 0 ) {
			var marker = $( ".g-map-info" ).data.marker;
			marker.setImage( marker.imageLo );
			$( ".g-map-info" ).remove();
		}
	}

	function AddCustomMapTypeButtons( gMap ) {
		$( gMap.getContainer() ).append( "<div class='width-wrap'><div class='type'><a class='map selected pod-heading' title='map'>Map</a><a class='satellite pod-heading' title='satelite'>Satellite</a><a class='terrain pod-heading' title='terrain'>Terrain</a></div></div>" );
		$( ".g-map-container .type .map" ).click( function () {
			gMap.setMapType( G_NORMAL_MAP );
			$( this ).addClass( "selected" ).siblings().removeClass( "selected" )
		} );
		$( ".g-map-container .type .terrain" ).click( function () {
			gMap.setMapType( G_PHYSICAL_MAP );
			$( this ).addClass( "selected" ).siblings().removeClass( "selected" )
		} );
		$( ".g-map-container .type .satellite" ).click( function () {
			gMap.setMapType( G_SATELLITE_MAP );
			$( this ).addClass( "selected" ).siblings().removeClass( "selected" )
		} );

		var pos = new google.maps.ControlPosition( G_ANCHOR_TOP_RIGHT, new GSize( 0, 7 ) );
		pos.apply( $( ".g-map-container .type" )[0] );
	}

	function AddCategoriesNavigation( theMap ) {
		$( ".g-map-container .category" ).remove();
		$( theMap.getContainer() ).append( "<div class='width-wrap'><div class='category'><h4><div class='toggle' title='Show/Hide Categories' />Show on the map</h4><div class='body'></div></div></div>" );
		$( ".g-map-container .category .toggle" ).click( function () {
			$( this ).toggleClass( "closed" );
			$( this ).parent().toggleClass( "closed" );
			$( ".category .body" ).slideToggle();
		} );

		/*
		var pos2 = new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(200, 0));
		pos2.apply($("a:contains('Terms of Use')").parent().get(0));
		*/

		var parent = 0;
		var checked;
		var categories = {};
		for ( var i = 0; i < theMap.data.categories.length; i++ ) {
			categories[theMap.data.categories[i].id] = theMap.data.categories[i].id;
		}
		for ( var i = 0; i < theMap.data.categories.length; i++ ) {
			var style;
			var showOneCategory = $( '.g-map-container' ).data( 'showOneCategory', '' );

			if ( theMap.data.categories[i].level == 1 ) {
				if ( theMap.data.categories[i].showCategory || theMap.data.categories[i].name == "Miscelaneous" ) {
					//Check to see if global var for category has been set
					if ( showOneCategory != undefined && showOneCategory != null && showOneCategory != '' && showOneCategory in categories ) {
						checked = showOneCategory == theMap.data.categories[i].id ? 'checked="checked"' : '';
						$( '.g-map-container' ).data( 'showOneCategory', showOneCategory );
					} else {
						checked = 'checked="checked"';
					}
				} else
					checked = "";
				parent = i;
			}

			if ( theMap.data.categories[i].showCategory ) {
				CssClass = theMap.data.categories[i].cssClass;
			} else {
				CssClass = "hidden";
			}
			$( ".g-map-container .category .body" ).append( "<label class=\"png " + CssClass + "\"><input type='checkbox' value='" + i + "' " + checked + " rel=\"" + ( parent != i ? parent : "" ) + "\" /><span class=\"iconf-" + CssClass + "\"></span>" + theMap.data.categories[i].name + "</label>" );
		}

		$( ".g-map-container .reload-markers" ).click( function () { google.maps.DownloadUrl( "/scripts/src/app/ui/map/google/LocationList.json.aspx", ProcessJson ); } );
		$( ".g-map-container .category input" ).click( function () {
			var isChecked = $( this ).get( 0 ).checked;
			$( ".g-map-container .category input[rel=" + $( this ).val() + "]" ).each( function () {
				this.checked = isChecked;
			} );
			categoryChanged( theMap );
		} );

	}

	function categoryChanged( theMap ) {
		//alert('changing selection');
		var selectedCategoryIDs = new Array;
		var index = 0;
		$( ".g-map-container .category input:checked" ).each( function () {
			selectedCategoryIDs[index] = $( this ).val();
			index++;
		} );
		//alert("ShowMarkers(theMap, " + selectedCategoryIDs + ");")
		ShowMarkers( theMap, selectedCategoryIDs );
	}

	function AddCustomNavigation( gMap ) {
		$( gMap.getContainer() ).append( "<div class='width-wrap'><div class='nav'><div class='pan'><a class='north'></a><a class='west'></a><a class='centre'></a><a class='east'></a><a class='south'></a></div><div class='zoom'><a class='in'></a><div class='slider'></div><a class='out'></a></div></div></div>" );
		$( ".g-map-container .pan .north" ).click( function () { gMap.panDirection( 0, 1 ); } );
		$( ".g-map-container .pan .west" ).click( function () { gMap.panDirection( 1, 0 ); } );
		$( ".g-map-container .pan .centre" ).click( function () { gMap.returnToSavedPosition(); } );
		$( ".g-map-container .pan .east" ).click( function () { gMap.panDirection( -1, 0 ); } );
		$( ".g-map-container .pan .south" ).click( function () { gMap.panDirection( 0, -1 ); } );

		$( ".g-map-container .zoom .in" ).click( function () { gMap.zoomIn(); } );
		$( ".g-map-container .zoom .out" ).click( function () { gMap.zoomOut(); } );

		var startZoom = gMap.getZoom();
		$( ".g-map-container .zoom .slider" ).slider( 
			{
				orientation: "vertical",
				handle: ".ui-slider-handle",
				value: startZoom,
				min: 0,
				max: 17,
				step: 1,
				slide: function ( event, ui ) {
					gMap.setZoom( ui.value );
				}
			}
		);

		$( ".g-map-container .zoom .slider" ).slider( "value", startZoom ); // startZoom doesn't seem to work???
		google.maps.Event.addListener( gMap, "zoomend", function ( a, b ) { $( ".zoom .slider" ).slider( "value", b ) } );
	}

	// default view centre on Christchurch

	function DefaultView( gMap ) {
		//gMap.clearOverlays();
		gMap.setCenter( new google.maps.LatLng( -43.53164036353273, 172.63667106628418 ), 8 );
	}

	// setup a global scope object to re-use whenever creating a marker

	function SetBaseIcon() {
		baseIcon = new google.maps.Icon();
		baseIcon.shadow = "/images/interface/map/shadow.png";
		baseIcon.iconSize = new google.maps.Size( 29, 28 );
		baseIcon.shadowSize = new google.maps.Size( 52, 28 );
		baseIcon.iconAnchor = new google.maps.Point( 14, 28 );
		baseIcon.infoWindowAnchor = new google.maps.Point( 9, 2 );
		baseIcon.infoShadowAnchor = new google.maps.Point( 18, 25 );
	}

	/*// Create a GlatLngBounds object for the given collection of points
	function FindBounds( pointArray ) {
	var bounds = new google.maps.LatLngBounds();
	for ( var i = 0; i < pointArray.length; i++ ) {
	bounds.extend( pointArray[i] );
	}
	return bounds;
	}

	// Find the Centre given a GlatLngBounds object (the built in function doesn't seem to work)
	function FindCentre( bounds ) {
	var clat = ( bounds.getNorthEast().lat() + bounds.getSouthWest().lat() ) / 2; // get lat & long for center of rectangle described by bounds
	var clng = ( bounds.getNorthEast().lng() + bounds.getSouthWest().lng() ) / 2;
	return new google.maps.LatLng( clat, clng ); 									// set new center
	}*/

	// Find the GMap2 object by recursing up the dom tree to find where it has been attached.

	function FindMap( data ) {
		return globalMap;
	}

	return {
		init: function () {
			$gmapContainer = $( '.g-map-container' );
			this._initSubscriptions();
			module = this;
		},
		_initSubscriptions: function () {
			$.subscribe( '/googlemap/toggle-complete', this._loadMap );
			$.subscribe( '/googlemap/resize-map', this._resizeMap );
		},
		_loadMap: function ( data ) {
			var id = data.ref;
			if ( !mapLoaded ) {
				module._createMap( id );
				return;
			}

			if ( id !== 0 ) {
				ShowOnly( id );
			}

			$.publish( '/googlemap/resize' );
		},
		_createMap: function ( id ) {
			SetBaseIcon();
			$gmapContainer.each( function () {
				globalMap = CreateGMap( this, "large" );
				google.maps.DownloadUrl( "/scripts/src/app/ui/map/google/LocationList.json.aspx", function ( doc ) {
					ProcessJson( doc );
					if ( id )
						ShowOnly( id );
					ShowRedZone( globalMap );
				} );
			} );
			mapLoaded = true;
		},
		_resizeMap: function () {
			var theMap = FindMap();
			if ( theMap )
				theMap.checkResize();
		}
	};
} );