/* global: UI */
describe( 'the content', function () {

	jasmine.getFixtures().fixturesPath = '/scripts/tests/spec/javascripts/fixtures';

	var $html;
	var data;

	afterEach( function () {
		$html = null;
		data = null;
	} );

	describe( 'the Content events', function () {

		it( 'should publish a "/ajax/get" event', function () {

			var spy = sinon.spy();
			data = {
				url: '/testurl/2',
				id: UI.InfiniteScroll.Content._id
			};
			$.subscribe( '/ajax/get', spy );

			UI.InfiniteScroll.Content._processMore( data );

			expect( spy ).toHaveBeenCalled();

			$.unsubscribe( '/ajax/get', spy );

		} );

		it( 'should publish an "/ajax/get" event with the correct data', function () {

			var spy = sinon.spy();
			data = {
				url: '/testurl/2',
				id: UI.InfiniteScroll.Content._id
			};
			$.subscribe( '/ajax/get', spy );

			UI.InfiniteScroll.Content._processMore( data );

			expect( spy ).toHaveBeenCalledWith( data );

			$.unsubscribe( '/ajax/get', spy );

		} );

		it( 'should publish a "/pagination/update" event', function () {

			var spy = sinon.spy();
			var paginationData = {
				start: 11,
				end: 20
			};
			$.subscribe( '/pagination/update', spy );

			UI.InfiniteScroll.Content._publishUpdateEvent( data );

			expect( spy ).toHaveBeenCalled();

			$.unsubscribe( '/pagination/update', spy );

		} );

		it( 'should publish an "/pagination/update" event with the correct data', function () {

			var spy = sinon.spy();
			var paginationData = {
				start: 11,
				end: 20
			};
			$.subscribe( '/pagination/update', spy );

			UI.InfiniteScroll.Content._publishUpdateEvent( paginationData );

			expect( spy ).toHaveBeenCalledWith( paginationData );

			$.unsubscribe( '/pagination/update', spy );

		} );

		it( 'should publish a "/listing/complete" event', function () {

			var data;
			var $html;
			var spy = sinon.spy();

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );
			$html = $( '.js-listing-infinite' );
			data = {
				html: $html
			};

			$.subscribe( '/listing/complete', spy );

			UI.InfiniteScroll.Content._processHtml( data );

			expect( spy ).toHaveBeenCalled();

			$.unsubscribe( '/listing/complete', spy );

		} );

	} );

	describe( 'the content being appended', function () {

		it( 'should append the new listing at the end', function () {

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );
			$html = $( '.js-listing-infinite' );

			UI.InfiniteScroll.Content._appendContent( $html );

			expect( $( '.js-pagination' ).last().nextAll().length ).toEqual( 1 );

		} );

		it( 'should not break if there is no content', function () {

			var spy = sinon.spy( UI.InfiniteScroll.Content, "_appendContent" );
			data = {
				html: $()
			};
			UI.InfiniteScroll.Content._processHtml( data );

			expect( spy ).not.toHaveBeenCalled();

		} );

	} );

	describe( 'the generated content object for pagination', function () {

		it( 'should create an object with the start value', function () {

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.start ).toBeDefined();
		} );

		it( 'should create an object with the end value', function () {

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.end ).toBeDefined();
		} );

		it( 'should return the correct start value', function () {

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.start ).toEqual( 1 );
		} );

		it( 'should return the correct end value', function () {

			loadFixtures( '/listing/pagination-with-listing-fixture.html' );

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.end ).toEqual( 10 );
		} );

		it( 'should return the correct start value if there are no items', function () {

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.start ).toEqual( 0 );

		} );

		it( 'should return the correct end value if there are no items', function () {

			$html = $( '.js-listing-infinite' );
			data = UI.InfiniteScroll.Content._generateData( $html );

			expect( data.end ).toEqual( 0 );

		} );

	} );

} );