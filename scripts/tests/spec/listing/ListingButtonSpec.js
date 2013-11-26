/* global: UI */
describe( 'the listing button', function () {

	jasmine.getFixtures().fixturesPath = '/scripts/tests/spec/javascripts/fixtures';

	var data = {
		url: '/testurl/2'
	};

	beforeEach( function () {
		loadFixtures( '/listing/full-listing-fixture.html' );
	} );

	describe( 'the Button events', function () {

		describe( 'the publish events', function () {

			it( 'should publish a "/listing/more" event', function () {

				var spy = sinon.spy();
				$.subscribe( '/listing/more', spy );

				UI.InfiniteScroll.Button._showMore( data );

				expect( spy ).toHaveBeenCalled();

				$.unsubscribe( '/listing/more', spy );

			} );

			it( 'should publish an "/listing/more" event with the correct data', function () {

				var spy = sinon.spy();
				$.subscribe( '/listing/more', spy );

				UI.InfiniteScroll.Button._publishMoreEvent( data.url );

				expect( spy ).toHaveBeenCalledWith( data );

				$.unsubscribe( '/listing/more', spy );

			} );

			it( 'should not publish a "/listing/more" event if there are no pages left', function () {

				var spy = sinon.spy();
				$.subscribe( '/listing/more', spy );

				UI.InfiniteScroll.Button._showMore( {
					url: -1
				} );

				expect( spy ).not.toHaveBeenCalled();

				$.unsubscribe( '/listing/more', spy );

			} );

			it( 'should publish a "/pagination/next" event', function () {

				var spy = sinon.spy();
				$.subscribe( '/pagination/next', spy );

				UI.InfiniteScroll.Button._publishNextEvent();

				expect( spy ).toHaveBeenCalled();

				$.unsubscribe( '/pagination/next', spy );

			} );

		} );

		describe( 'the buttons visibility', function () {

			var clock;

			beforeEach( function () {

				clock = sinon.useFakeTimers();
				UI.InfiniteScroll.Button._$button = $( '.js-listing-infinite-btn' );

			} );

			afterEach( function () {

				clock.restore();
				UI.InfiniteScroll.Button._$button.show();
				UI.InfiniteScroll.Button._$button = null;
				UI.InfiniteScroll.Button._hasMore = true;
			} );

			it( 'should hide the button after being clicked', function () {

				UI.InfiniteScroll.Button._initEvents();

				UI.InfiniteScroll.Button._$button.trigger( 'click' );
				clock.tick( 600 );

				expect( UI.InfiniteScroll.Button._$button ).not.toBeVisible();

			} );

			it( 'should show the button after it was hidden', function () {

				UI.InfiniteScroll.Button._$button.hide();

				UI.InfiniteScroll.Button._showButton();
				clock.tick( 600 );

				expect( UI.InfiniteScroll.Button._$button ).toBeVisible();

			} );

			it( 'should not show the button if there are no more items', function () {

				UI.InfiniteScroll.Button._$button.hide();
				UI.InfiniteScroll.Button._hasMore = false;

				UI.InfiniteScroll.Button._showButton();
				clock.tick( 600 );

				expect( UI.InfiniteScroll.Button._$button ).not.toBeVisible();

			} );

		} );

	} );

} );