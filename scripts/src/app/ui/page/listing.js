define( ['jquery', 'app/ui/mediaqueries/mediaqueries', 'app/ui/infinitescroll/infinitescroll', 'app/availability/availability', 'app/util/useragent'], function ( $, MediaQueries, InfiniteScroll, Availability, UserAgent ) {

	'use strict';

	return {
		$rotator: $( '.js-rotator-listing' ),
		$search: $( '.js-listing-search' ),
		$searchButton: $( '.js-listing-search-button' ),
		$searchSubmit: $( '.js-listing-search-submit' ),
		$sort: $( '#sortInput' ),
		queries: {
			"listing-search-medium": "screen and (max-width: 639px)"
		},
		init: function () {
			InfiniteScroll.init();
			Availability.init();
			this.bindGenericListingSortInput();
			this.bindRotator();
			this.bindListForm();
			this.bindListFormButton();
			this.bindDatepickerInput();
		},
		bindGenericListingSortInput: function () {
			this.$sort.change( function () {
				location.href = $( this ).find( 'option:selected' ).data( 'href' );
			} );
		},
		bindRotator: function () {
			if ( this.$rotator ) {
				require( ['app/ui/rotator/listing'], function ( ListingRotator ) {
					$( document ).ready( function () {
						ListingRotator.init();
					} );
				} );
			}
		},
		bindDatepickerInput: function () {
			var $dateInput = $( "#CheckInDateInput" );

			if ( !$dateInput.length ) {
				return;
			}

			if ( UserAgent.isIOS() ) {
				$dateInput.attr('type', 'date');
				return;
			}

			require(['datepicker'], function() {
				$dateInput.datepicker( { dateFormat: "yy-mm-dd" } );
			});
		},
		bindListForm: function () {
			var module = this;
			if ( this.$search ) {
				MediaQueries.register( {
					queries: this.queries["listing-search-medium"],
					shouldDegrade: true,
					match: function () {
						require( ['expandcollapse'], function () {
							$( document ).ready( function () {
								module.$search.expandCollapse();
							} );
						} );
					},
					unmatch: function () {
						require( ['expandcollapse'], function () {
							$( document ).ready( function () {
								module.$search.expandCollapse( 'destroy' );
							} );
						} );
					}
				} );
			}
		},
		bindListFormButton: function () {
			this.$searchButton.on( 'click', { module: this }, function ( event ) {
				event.preventDefault();
				var module = event.data.module;
				module.$search.find( module.$searchSubmit ).trigger( 'click' );
			} );
		}
	};

} );