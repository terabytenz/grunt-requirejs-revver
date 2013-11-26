describe( 'the Ajax Manager', function () {

	jasmine.getFixtures().fixturesPath = '/scripts/tests/spec/javascripts/fixtures';

	describe( 'the ajax manager events', function () {

		var id = '1234';

		it( 'it publishes the "/ajax/ready/id" event', function () {

			var spy = sinon.spy();
			$.subscribe( '/ajax/ready/' + id, spy );

			UI.Ajax.Manager._publishResponseEvent( id );

			expect( spy ).toHaveBeenCalled();

			$.unsubscribe( '/ajax/ready/' + id );

		} );

	} );

	describe( 'the network behaviours', function () {

		var $html;
		var server;
		var url = '/testurl/2';
		var id = 1234;

		beforeEach( function () {
			loadFixtures( '/listing/listing-only-fixture.html' );

			$html = $( '.js-listing-infinite' );
			server = sinon.fakeServer.create();
			server.respondWith( 
				'GET',
				url,
				[
					200,
					{ 'Content-Type': 'text/html' },
					'OK'
				] );
		} );

		afterEach( function () {
			server.restore();
		} );

		it( "should make the correct request", function () {

			UI.Ajax.Manager._getContent( url );
			server.respond();

			expect( server.requests.length ).toEqual( 1 );
			expect( server.requests[0].method ).toEqual( "GET" );
			expect( server.requests[0].url ).toEqual( url );

		} );

		it( 'calls the correct callback', function () {

			var callback = sinon.spy();

			UI.Ajax.Manager._getContent( url, id, callback );
			server.respond();

			expect( callback.calledOnce ).toBeTruthy();

		} );

		xdescribe( 'the creation of the ajax callback', function () {

			it( 'should create a new callback with the callback passed in by client', function () {

				var data = {
					url: url,
					callback: function () {
					}
				};
				var publishCallback = function ( id ) {
					UI.Ajax.Manager._publishResponseEvent( id );
				};

				var newCallback = UI.Ajax.Manager._generateCallback( id, data.callback );

				expect( newCallback ).not.toEqual( publishCallback );

			} );

			it( 'should not create a new callback if no callback is passed in by client', function () {
				
				var data = {
					url: url
				};
				var publishCallback = function ( id ) {
					UI.Ajax.Manager._publishResponseEvent( id );
				};
				var newCallback = UI.Ajax.Manager._generateCallback( data.callback );
				expect( newCallback.toString() ).toEqual( publishCallback.toString() );

			} );

		} );

	} );

} );