/*!
* jQuery lightweight plugin boilerplate
* Original author: @ajpiano
* Further changes, comments: @addyosmani
* Licensed under the MIT license
*/

; ( function ( $, window, document, undefined ) {


	// Create the defaults once
	var pluginName = 'expandCollapse',
		defaults = {
			header: '.js-expander-banner',
			content: '.js-expander-body',
			expandedClass: 'is-expanded',
			collapsedClass: 'is-collapsed'
		};

	// The actual plugin constructor
	function ExpandCollapse( element, options ) {
		this.element = element;
		this.$element = $( element );

		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	ExpandCollapse.prototype.init = function () {
		this.$element.find( this.options.header + ',' + this.options.content )
			.addClass( this.options.collapsedClass );
		this.initEvents();
	};

	ExpandCollapse.prototype.initEvents = function () {
		this.$element.on( 'click', this.options.header, { $plugin: this }, this.processClick );
	};

	ExpandCollapse.prototype.processClick = function ( e ) {
		e.preventDefault();
		var $thisExpander = $( this ),
			$thisPlugin = e.data.$plugin;
		$thisPlugin.processHeader( $thisExpander );
		$thisPlugin.processContent( $thisExpander );
	};

	ExpandCollapse.prototype.processHeader = function ( $thisExpander ) {
		$thisExpander.toggleClass( this.options.expandedClass + ' ' + this.options.collapsedClass );
		$thisExpander.find( '.icon-expander' ).toggleClass( this.options.expandedClass );
	};

	ExpandCollapse.prototype.processContent = function ( $thisExpander ) {
		var $content;
		if ( !this.options.customContentFunction ) {
			$content = $thisExpander.parent().find( this.options.content );
		} else {
			$content = this.options.customContentFunction( $thisExpander );
		}
		
		if($content.is('.' + this.options.expandedClass)) {
			$content.removeClass(this.options.expandedClass).addClass(this.options.collapsedClass);
		} else {
			$content.removeClass(this.options.collapsedClass).addClass(this.options.expandedClass);
		}
	};
	
	ExpandCollapse.prototype.destroy = function() {
		this.$element
			.off('click', this.options.header, this.processClick)
			.data("plugin_" + pluginName, '')
			.find( this.options.header + ', ' + this.options.content )
				.removeClass(this.options.collapsedClass + ' ' + this.options.expandedClass);
	};

	$.fn[pluginName] = function ( options ) {
		
		if(typeof options === 'string' && options === 'destroy') {
			$(this).data("plugin_" + pluginName).init();
			$(this).data("plugin_" + pluginName).destroy();
			return false;
		}
		
		return this.each( function () {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName,
					new ExpandCollapse( this, options ) );
			}
		} );
		
	};

} )( jQuery, window, document );