define( ['jquery', ], function ( $ ) {

	'use strict';

	var $nav;
	var $navItems;
	var $navItemsLink;
	var $navToggle;
	var $search;
	var $searchToggle;

	function init() {
		if ( typeof $nav === 'undefined' ) {
			$nav = $( '#js-nav-primary' );
			$navItems = $nav.find( '.js-nav-section-with-menu' );
			$navItemsLink = $nav.find( '.js-nav-section-link' );
			$navToggle = $( '.js-header-toggle-menu' );
			$search = $( '#site-search' );
			$searchToggle = $( '.js-header-toggle-search' );
		}
	}

	function removeSetHeights() {
		$navItems.each( function () {
			var $thisNavItem = $( this );
			$thisNavItem.find( '.nav-level-2' ).css( 'height', 'auto' );
		} );
	}

	function toggleSmallMenu( event ) {
		event.preventDefault();

		if ( $search.is( '.is-expanded' ) ) {
			$searchToggle.trigger( 'click' );
		}

		$nav.toggleClass( 'is-expanded is-collapsed' );
		$navToggle.toggleClass( 'is-expanded' );

		if ( $nav.is( '.is-collapsed' ) ) {
			$nav.find( '.is-expanded' ).removeClass( 'is-expanded' );
		}
	}

	function toggleSmallSearch( event ) {
		event.preventDefault();

		if ( $navToggle.is( '.is-expanded' ) ) {
			$navToggle.trigger( 'click' );
		}

		$search.toggleClass( 'is-expanded' );
		$searchToggle.toggleClass( 'is-expanded' );
	}

	function openSubMenu( event ) {
		var $item = $( this );
		if ( !$item.is( '.is-expanded' ) ) {
			$navToggle.find( '.is-expanded' ).removeClass( 'is-expanded' );
		}
		$item.toggleClass( 'is-expanded' );
	}

	function openSubMenuLink( event ) {
		$navItems.off( 'click', openSubMenu );
	}

	function bind() {
		setData();
		$navToggle.on( 'click', toggleSmallMenu );
		$navItemsLink.on( 'click', openSubMenuLink );
		$navItems.on( 'click', openSubMenu );
		$searchToggle.on( 'click', toggleSmallSearch );
		removeSetHeights();
	}

	function unbind() {
		$navToggle.off( 'click', toggleSmallMenu );
		$navItemsLink.off( 'click', openSubMenuLink );
		$navItems.off( 'click', openSubMenu );
		$searchToggle.off( 'click', toggleSmallSearch );
		removeData();
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
		unbind: unbind
	};

} );