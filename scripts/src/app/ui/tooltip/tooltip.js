define( ['jquery', 'pubsub', 'tooltip'], function ( $ ) {

	'use strict';

	var $tooltip;

	return {
		subscribe: function () {
			$.subscribe( '/tooltip/custom', function ( data ) {

				data.width = data.width != 'auto' ? data.width : 'auto',
				data.showArrow = data.showArrow ? true : false;

				var close = '<a class="remove ir dark" href="#close">close</a>';
				var title = '<h3>' + data.title + '</h3>';
				var content = typeof ( data.content ) === 'string' ? '<p>' + data.content + '</p>' : data.content;
				var header = close + title;

				var arrowWidth = 15;
				var arrowTop = 22;

				if ( $tooltip.length === 0 ) {
					this.initTooltip();
				} else {
					this.resetTooltip();
				}

				// set dimensions
				$tooltip
					.html( header )
					.append( $( content ) )
					.css( {
						'left': '-10000px',
						'width': data.width
					} )
					.show()
					.on( 
						'click',
						'a.remove',
						function () {
							hideTooltip();
						}
					);

				//check box will not overflow window
				if ( this.isInWindow( data.positionX + ( data.showArrow ? arrowWidth : 0 ) ) ) {
					if ( data.showArrow ) {
						$tooltip.addClass( 'help smaller before' );
						data.positionX = data.positionX + arrowWidth;
					} else {
						$tooltip.addClass( 'smaller' );
					}
				} else {
					if ( data.showArrow ) {
						$tooltip.addClass( 'help smaller after' );
						data.positionX = ( data.positionXFlip != undefined ? data.positionXFlip : data.positionX ) - $tooltip.outerWidth() - ( data.showArrow ? arrowWidth : 0 )
					} else {
						$tooltip.addClass( 'smaller' );
						data.positionX = data.positionX - $tooltip.outerWidth();
					}
				}

				// adjust for arrow top
				data.positionY = data.showArrow ? data.positionY - arrowTop : data.positionY;

				// reset actual position
				$tooltip.hide().css( {
					'top': data.positionY,
					'left': data.positionX
				} );
				$tooltip.fadeIn( function () { if ( $( '.oldie' ).length ) this.style.removeAttribute( 'filter' ); } );

			} );
		},
		init: function () {
			this.subscribe();
			this.setUpTitle( 'dfn' );
			this.initTooltip();

			$( '.main' ).on( 'mouseover mouseout', 'dfn', function ( event ) {
				this.tooltipFunctionality( this, event );
			} );
		},
		tooltipFunctionality: function ( elem, event ) {
			var content = $( elem );
			this.resetTooltip();
			if ( event.type === 'mouseover' ) {
				event.preventDefault();

				var title = content.parents( '.features' ).length ? content.find( 'img' ).attr( 'alt' ) : elem.innerHTML;
				var text = content.parents( '.features' ).length ? content.find( 'p' ).html() : content.data( 'title' );
				var offsetTop = content.height();

				$tooltip
					.stop( true, true )
					.css( {
						top: content.offset().top + offsetTop + 15,
						left: content.offset().left
					} )
					.html( text )
					.fadeIn();
			} else {
				this.hideTooltip();
			}
		},
		setUpTitle: function ( elem ) {
			$( elem ).each( function ( index, value ) {
				var thisElem = $( this );
				thisElem.data( 'title', this.title );
				this.title = '';
			} );
		},
		resetTooltip: function () {
			$tooltip
				.removeClass( 'help smaller after before' )
				.width( 'auto' )
				.children()
				.hide();
		},
		hideTooltip: function () {
			$tooltip.fadeOut();
		},
		isInWindow: function ( positionX ) {
			var screen = document.body.offsetWidth;
			var box = positionX + $tooltip.outerWidth();
			return screen > box ? true : false;
		},
		initTooltip: function () {
			$( '<div id="tooltip" class="tooltip"></div>' ).hide().appendTo( 'body' );
			$tooltip = $( '#tooltip' ).hide();
		}
	};

} );