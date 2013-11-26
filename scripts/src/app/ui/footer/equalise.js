define( ['jquery', 'evensteven'], function ( $ ) {

	var $footerPods;
	var module;

	return {
		init: function ( state ) {
			module = this;
			$footerPods = $( '.footer-pods > .footer-pod' );
			$footerPods.evenSteven( {
				columns: module.state( state )
			} );
		},
		update: function ( state ) {
			$footerPods.evenSteven().update( {
				columns: module.state( state )
			} );
		},
		state: function ( state ) {
			var columns = 1;
			switch ( state ) {
				case 'medium':
					columns = 2;
					break;
				case 'large':
					columns = 4;
					break;
			}
			return columns;
		}
	};
} );