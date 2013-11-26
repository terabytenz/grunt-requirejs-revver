define( ['jquery', 'hoverIntent', 'ajaxInclude', 'evensteven'], function ( $ ) {

	'use strict';

	var $nav;
	var $navItems;
	var $navWithMenus;

	function init() {
		$nav = $( '#js-nav-primary' );
		$navItems = $nav.find( '.nav-section' );
		$navWithMenus = $nav.find( '.js-nav-section-with-menu' );
	}

	function bind() {

		setData();
		equaliseMenuItems();

		//Using hover if "touch" device. Some caveats with this as it is really only WebKit devices. See https://github.com/Modernizr/Modernizr/issues/548 and https://github.com/Modernizr/Modernizr/issues/753
		if ( $( '.no-touch' ).length ) {
			$navWithMenus.hoverIntent( toggleMegaMenu );
			return;
		}

		bindTouchEvents();

	}

	function bindTouchEvents() {
		$navWithMenus.each( function () {
			$( this ).find( '.js-nav-section-link' ).on( 'click', toggleMegaMenu );
		} );
		$( 'body' ).on( 'click', handleBodyClick );
	}


	function unbind() {
		$navWithMenus.find( '.js-nav-section-link' ).unbind( "click", toggleMegaMenu );
		$navWithMenus.unbind( "mouseenter" ).unbind( "mouseleave" );
		$navWithMenus.removeProp( 'hoverIntent_t' );
		$navWithMenus.removeProp( 'hoverIntent_s' );
		$navItems.evenSteven( 'destroy' );
		removeData();
	}

	function bindNavWidescreen() {

		if ( $nav.find( '.is-expanded' ).find( '.nav-feature' ).length ) {
			runNavFeatureSetup();
		}

		$nav.find( '[data-replace]' ).on( "ajaxInclude", function ( e ) {
			setTimeout( function () {
				runNavFeatureSetup();
			}, 100 );
		} );
	}

	function unbindNavWidescreen() {
		removeWidescreenHeights();
	}

	function toggleMegaMenu( event ) {

		event.preventDefault();
		var $thisTarget = $( this );
		var $thisNav = $thisTarget.is( '.js-nav-section-with-menu' ) ? $thisTarget : $thisTarget.closest( '.js-nav-section-with-menu' );
		var $expanded = $nav.find( '.is-expanded' );

		if ( !$thisNav.find( '.nav-feature' ).length ) {
			$thisNav.find( '[data-replace]' ).ajaxInclude();
		}
		loadImages( $thisNav );

		if ( event.type === 'click' && $expanded.find( '.js-nav-section-link' )[0] !== this ) {
			$expanded.removeClass( 'is-expanded' );
		}

		if ( !$thisNav.is( '.is-disabled' ) ) {
			$thisNav.toggleClass( 'is-expanded' );
		}
	}

	function handleBodyClick( e ) {
		var $target = $( e.target );
		if ( !$target.closest( '#js-nav-primary' ).length && $nav.find( '.is-expanded' ).length ) {
			$nav.find( '.is-expanded' ).removeClass( 'is-expanded' );
		}
	}

	function equaliseMenuItems() {
		$navItems.evenSteven( {
			resize: true
		} );
	}
	function removeWidescreenHeights() {
		$navItems.each( function () {
			var $thisNavItem = $( this );
			$thisNavItem.find( '.nav-positioning, .nav-secondary' ).css( 'height', '' );
		} );
	}

	function loadImages( $container ) {
		$container.find( ".lazy" ).filter( function () {
			var $thisImg = $( this );
			return this.src.indexOf( $thisImg.attr( 'data-original' ) ) === -1;
		} ).lazyload( {
			effect: "fadeIn"
		} );
	}

	function runNavFeatureSetup() {
		//Lazy load the nav feature images
		loadImages( $nav.find( '.is-expanded' ).find( '.nav-feature' ) );
	}

	function setData() {
		$nav.data( 'nav', 'true' );
	}

	function removeData() {
		$nav.removeData( 'nav' );
	}

	//Publicly exposed functions
	return {
		init: init,
		bind: bind,
		unbind: unbind,
		bindNavWidescreen: bindNavWidescreen,
		unbindNavWidescreen: unbindNavWidescreen
	};
} );