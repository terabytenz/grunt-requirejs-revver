define( ['jquery', 'app/util/cookiemanager'], function ( $, CookieManager ) {

	var cookieName = "trade-gallery-media";

	function getList( callback ) {
		if ( !callback ) return;
		var cookie = CookieManager.read( cookieName );
		var json = undefined;

		try {
			json = jQuery.parseJSON( cookie );
		} catch ( err ) {
		}

		if ( cookie === '' || json === null || json === undefined ) {
			CookieManager.create( cookieName, '{}', 7 );
			return;
		}

		json = jQuery.parseJSON( CookieManager.read( cookieName ) );
		callback( json );
	}

	function addMediaItem( data ) {
		var json = getJson();
		json[data.src] = data;
		setJson( json );
	}

	function removeMediaItem( data ) {
		var json = getJson();
		delete json[data.src];
		setJson( json );
	}

	// UTIL
	function getJson() {
		var json = jQuery.parseJSON( CookieManager.read( cookieName ) );
		if ( json === null ) {
			json = {};
		}
		return json;
	}

	function setJson( data ) {
		CookieManager.create( cookieName, JSON.stringify( data ), 7 );
	}

	return {
		getList: getList,
		addMediaItem: addMediaItem,
		removeMediaItem: removeMediaItem
	};
} );