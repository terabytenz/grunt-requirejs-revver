/* global: UI */
describe( 'the listing pagination', function () {

	jasmine.getFixtures().fixturesPath = '/scripts/tests/spec/javascripts/fixtures';

	var $pagination;
	var data = {
		start: 11,
		end: 20
	};

	describe( 'the pagination events', function () {

		beforeEach( function () {
			loadFixtures( '/listing/pagination-only-fixture.html' );
		} );

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		it( 'should publish a /pagination/url', function () {

			var spy = sinon.spy();
			$.subscribe( '/pagination/url', spy );

			UI.InfiniteScroll.Pagination._publishUrlEvent();

			expect( spy ).toHaveBeenCalled();

		} );

		it( 'should publish an "/pagination/url" event with the correct data', function () {

			var spy = sinon.spy();
			var urlData = {
				url: '/testurl/2',
				hasMore: true
			};
			$.subscribe( '/pagination/url', spy );

			UI.InfiniteScroll.Pagination._publishUrlEvent( urlData );

			expect( spy ).toHaveBeenCalledWith( urlData );

			$.unsubscribe( '/pagination/url', spy );

		} );

	} );

	describe( 'retrieving the pagination HTML', function () {

		beforeEach( function () {
			loadFixtures( '/listing/pagination-only-fixture.html' );
		} );

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		it( 'should make a copy of the pagination HTML', function () {

			$pagination = UI.InfiniteScroll.Pagination._getPagination();
			expect( $pagination ).toHaveClass( 'js-pagination' );

		} );

		it( 'should only retrieve one copy of the pagination HTML', function () {

			$( '.js-pagination' ).clone().appendTo( '#jasmine-fixtures' );
			$pagination = UI.InfiniteScroll.Pagination._getPagination();

			expect( $pagination.length ).toEqual( 1 );

		} );

	} );

	describe( 'appending the pagination HTML', function () {

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		beforeEach( function () {
			loadFixtures( '/listing/pagination-only-fixture.html' );
			appendLoadFixtures( '/listing/listing-only-fixture.html' );
			UI.InfiniteScroll.Pagination._getPagination();
		} );

		it( 'should append pagination', function () {

			UI.InfiniteScroll.Pagination._insertPagination();

			expect( $( '.js-pagination' ).length ).toEqual( 2 );

		} );

		it( 'should append the pagination after the last listing', function () {

			UI.InfiniteScroll.Pagination._insertPagination();

			$pagination = UI.InfiniteScroll.Pagination._getPagination();

			expect( $pagination.nextAll().length ).toEqual( 0 );

		} );

		it( 'should not remove the other pagination when appending a new one', function () {

			UI.InfiniteScroll.Pagination._insertPagination();

			var $firstPagination = $( '.js-pagination' ).first();
			expect( $firstPagination.find( '.js-pagination-start' ) ).toHaveText( '1' );

		} );

	} );

	describe( 'updating the pagination HTML', function () {

		beforeEach( function () {
			loadFixtures( '/listing/pagination-only-fixture.html' );
		} );

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		it( 'should update the start value correctly', function () {

			UI.InfiniteScroll.Pagination._getPagination();
			UI.InfiniteScroll.Pagination._updateValues( data );

			expect( UI.InfiniteScroll.Pagination._$pagination.find( '.js-pagination-start' ) ).toHaveText( '11' );

		} );

		it( 'should update the end value correctly', function () {

			UI.InfiniteScroll.Pagination._getPagination();
			UI.InfiniteScroll.Pagination._updateValues( data );

			expect( UI.InfiniteScroll.Pagination._$pagination.find( '.js-pagination-end' ) ).toHaveText( '20' );

		} );

		it( 'it should update the next page correctly', function () {

			var $nextSelected;
			var url = '/testurl/2';

			UI.InfiniteScroll.Pagination._updateSelected();
			$nextSelected = $( '.js-pagination-pages' ).find( '[href="' + url + '"]' );

			expect( $nextSelected ).toHaveClass( 'is-selected' );

		} );

		it( 'it should update the page number correctly', function () {

			var pageNumber;
			var newPage = 2;
			var $pages = $( '.js-pagination-pages' );
			var $selected = $pages.find( '.is-selected' ).removeClass( 'is-selected' );
			UI.InfiniteScroll.Pagination._getPagination();

			$selected.closest( 'li' ).next( 'li' ).find( 'a' ).addClass( 'is-selected' );

			UI.InfiniteScroll.Pagination._updatePageNumber();
			pageNumber = parseInt( UI.InfiniteScroll.Pagination._$pagination.find( '.js-pagination-page-number' ).text(), 10 );

			expect( pageNumber ).toEqual( newPage );

		} );

		it( 'it should remove the "is-selected" class from the previous page correctly', function () {

			var $selected;

			$selected = $( '.js-pagination-pages' ).find( 'is-selected' );
			UI.InfiniteScroll.Pagination._updateSelected();

			expect( $selected ).not.toHaveClass( 'is-selected' );

		} );

	} );

	describe( 'generating data', function () {

		beforeEach( function () {
			loadFixtures( '/listing/pagination-only-fixture.html' );
		} );

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		it( 'should generate the correct next page url', function () {
			var url = '/testurl/2';

			var nextPage = UI.InfiniteScroll.Pagination._getNextPageUrl();

			expect( nextPage ).toContain( url );

		} );

		it( 'should return true if there are more results to show', function () {

			var hasMore = UI.InfiniteScroll.Pagination._hasMoreResults();

			expect( hasMore ).toBeTruthy();

		} );

		it( 'should return false if there are no more results to show', function () {

			var $pages = $( '.js-pagination-pages' );

			$pages.find( '.is-selected' ).removeClass( 'is-selected' );
			$pages.find( 'li' ).last().prev().find( 'a' ).addClass( 'is-selected' );

			var hasMore = UI.InfiniteScroll.Pagination._hasMoreResults();

			expect( hasMore ).toBeFalsy();

		} );

	} );

	describe( 'the rewriting of the pagination urls', function () {

		beforeEach( function () {
			loadFixtures( '/listing/pagination-with-url-fixture.html' );
		} );

		afterEach( function () {
			$pagination = null;
			UI.InfiniteScroll.Pagination._$pagination = null;
		} );

		it( 'should determine the correct page size of the pagination', function () {

			UI.InfiniteScroll.Pagination._getPagination();
			var pageSize = UI.InfiniteScroll.Pagination._getPageSize();

			expect( pageSize ).toEqual( 10 );

		} );

		it( 'should determine the page number from the url correctly', function () {

			var href = 'http://tbpc13-pc.terabyte.co.nz/where-to-stay?PageNumber=3#results';

			var pageNumber = UI.InfiniteScroll.Pagination._getPageNumberFromUrl( href );

			expect( pageNumber ).toEqual( '3' );
		} );

		it( 'should work out the correct starting point for the next listing url', function () {

			var href = 'http://tbpc13-pc.terabyte.co.nz/where-to-stay?PageNumber=3#results';
			UI.InfiniteScroll.Pagination._getPagination();

			var pageNumber = UI.InfiniteScroll.Pagination._getPageNumberFromUrl( href );
			var nextPageStartingPoint = UI.InfiniteScroll.Pagination._getNextStartingPoint( pageNumber );

			expect( nextPageStartingPoint ).toEqual( 21 );
		} );

		it( 'should create the new url correctly', function () {

			UI.InfiniteScroll.Pagination._getPagination();
			
			var oldUrl = 'http://tbpc13-pc.terabyte.co.nz/where-to-stay?PageNumber=5#results';
			var newUrl = '/base/services/InfiniteOperatorListing/1135/41/10';

			var modifiedUrl = UI.InfiniteScroll.Pagination._getNewUrl( oldUrl );

			expect( newUrl ).toEqual( modifiedUrl );

		} );

		xit( 'should determine the correctly create a new url depending on the page number', function () {

			UI.InfiniteScroll.Pagination._getPagination();
			var pageSize = UI.InfiniteScroll.Pagination._getPageSize();

			expect( pageSize ).toEqual( 10 );

		} );

	} );

} );