define( ['app/ui/mediaqueries/mediaqueries', 'app/ui/page/all'], function ( MediaQueries, All ) {

	'use strict';

	return {
		init: function() {
			MediaQueries.init();
			All.init();
		}
	};

} );
