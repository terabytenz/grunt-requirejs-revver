/* global: UI */
describe( 'the google map', function () {

	var clock;

	//Code smell due to bad original code...needs refactoring
	window.GoogleAPIKey = 'ABQIAAAAATdo76wvNIsBBgQxzNWAlhRi2wHuSFQDue_e1rvDGXQZiW4wUxSGIY8uSAuv-yGsSHARgVLcvGXEAg';
	window.isMapJsLoaded = true;

	jasmine.getFixtures().fixturesPath = '/scripts/tests/spec/javascripts/fixtures';

	beforeEach( function () {
		clock = sinon.useFakeTimers();
		loadFixtures( '/map/google-map-fixture.html' );
	} );

	afterEach( function () {
		clock.restore();
	} );

	describe( 'the toggle button', function () {

		var $container;
		var $button;

		beforeEach( function () {
			$container = $( '#map-main' );
			$button = $( '.js-map-toggle' );

			InitMapButtons();
		} );

		afterEach( function () {
			$container = null;
			$button = null;
		} );

		it( 'opens the container when it is clicked', function () {

			$button.trigger( 'click' );
			clock.tick( 1000 );

			expect( $container ).toBeVisible();

		} );

		it( 'closes the container when it is open and clicked', function () {

			$button.trigger( 'click' );
			clock.tick( 1000 );
			$button.trigger( 'click' );
			clock.tick( 1000 );

			expect( $container ).not.toBeVisible();

		} );

		it( 'changes the text of the button when opened', function () {

			var label;

			$button.trigger( 'click' );
			clock.tick( 1000 );
			
			label = $button.find( '.map-button-label' ).text();
			expect( label ).toEqual( 'Close Google Map' );

		} );

		it( 'changes the text of the button when closed', function () {

			var label;

			$button.trigger( 'click' );
			clock.tick( 1000 );
			$button.trigger( 'click' );
			clock.tick( 1000 );
			
			label = $button.find( '.map-button-label' ).text();
			expect( label ).toEqual( 'Open Google Map' );

		} );

	} );

} );