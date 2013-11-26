/*!
* jQuery lightweight plugin boilerplate
* Original author: @ajpiano
* Further changes, comments: @addyosmani
* Licensed under the MIT license
*/

; (function ($, window, document, undefined) {

	var pluginName = 'scrollItUp';
	var	defaults = {
			vertical: false,
			next: '.scroller-next',
			previous: '.scroller-previous',
			speed: 500,
			step: 200,
			easing: 'easeInOutExpo',
			itemsWrapper: '.scroller-content',
			items: '.scroller-item',
			viewport: '.scroller-viewport',
			setup: 'responsive',
			onhover: false,
			lazyLoad: false,
			responsiveConfig: {
				itemWidth: 210,
				margin: 20,
				itemsPerView: 4
			}
		};
	
	/*======= ImageLoader ======= */
	var ImageLoader = {
		getImages: function ( $items, index, itemCount ) {
			var $itemsToShow = $items.slice(index, index + itemCount);
			$itemsToShow.find('img').filter( function () {
				var $thisImg = $( this );
				return !!$thisImg.attr( 'data-original' ) && $thisImg[0].src.indexOf( $thisImg.attr( 'data-original' ) ) === -1;
			} ).lazyload( {
				effect: "fadeIn",
				skipInvisible: false
			} );
		}
	};

	// The actual plugin constructor
	function Plugin(element, options) {

		var $lastItem;
		var index;
		
		//Instance variables
		this.element = element;
		this.$element = $(this.element);
		this.options = $.extend({}, defaults, options);
		this.$container = $(element).find(this.options.itemsWrapper);
		this.$viewport = $(element).find(this.options.viewport);
		this.$items = this.$container.find(this.options.items);
		this.itemsLength = this.$container.find(this.options.items).length;
		this._defaults = defaults;
		this._name = pluginName;
		this.intervalId = 0;
		this.minScroll = 0;
		this.scrollDirection = !this.options.vertical ? "left" : "top";

		$lastItem = this.$container.find(this.options.items).eq(this.itemsLength - 1);
		
		this.maxScroll = !this.options.vertical 
			? (($lastItem.position().left + $lastItem.width()) - this.$viewport.width()) 
				: this.$container.height() - this.$viewport.height() ;

		this.setup[this.options.setup](this);
		this.initItems();
		this.initControls();
		this.initEvents();

		index = this.$items.index(this.$items.filter('.is-selected'));
		if(this.options.lazyLoad) {
			ImageLoader.getImages(this.$items, index, this.options.responsiveConfig.itemsPerView);
		}
		
	}

	Plugin.prototype.setup = {
		'responsive': function(plugin) {

			var width = plugin.options.responsiveConfig.itemWidth;
			var margin = plugin.options.responsiveConfig.margin;
			var itemWidth = width - margin;
			var itemsPerWindow = plugin.options.responsiveConfig.itemsPerView;
			var containerWidth = width * plugin.itemsLength;
			var viewportWidth = (width * itemsPerWindow) - margin;

			var viewportScale = (containerWidth / viewportWidth) * 100;
			var marginPercent = (margin / containerWidth * 100);
			var marginLeftContainerPercent = (margin / viewportWidth * 100) * -1;
			var itemWidthPercent = (itemWidth / containerWidth * 100);

		/*	console.log({
				containerWidth: containerWidth,
				itemWidth: itemWidth,
				itemsPerWindow: itemsPerWindow,
				itemWidthPercent: itemWidthPercent + '%',
				margin: margin,
				marginPercent: marginPercent + '%',
				marginLeftContainerPercent: marginLeftContainerPercent + '%',
				pluginItemsLength: plugin.itemsLength,
				viewportScale: viewportScale,
				viewportWidth: viewportWidth,
				'width' : width
			});*/

			plugin.$container.css({
				width: viewportScale + '%',
				marginLeft: marginLeftContainerPercent + '%'
			});
			plugin.$container.find(plugin.options.items).css({
				width: itemWidthPercent + '%',
				marginLeft: marginPercent + '%'
			});

		}
	};

	Plugin.prototype.initItems = function () {
		this.$items.css('display', 'block');
	};

	Plugin.prototype.initControls = function () {
		this.$element.find(this.options.next + ', ' + this.options.previous).on('click', {proxy: this}, this.processClick);
	};
	
	Plugin.prototype.initEvents = function () {
		$(window).on('resize', { proxy: this }, $.throttle(50, this.processResize));
	};
	
	Plugin.prototype.processClick = function(e) {
		e.preventDefault();
		var $this = $(this);
		var direction = $this.is(e.data.proxy.options.next) ? 'forward' : 'backwards';
		e.data.proxy.move( $this, direction );
	};

	Plugin.prototype.processResize = function(e) {
		
		if( !e || !e.data || !e.data.proxy || e.data.proxy._name !== 'scrollItUp') {
			return;
		}
		
		var $thisPlugin = e.data.proxy;
		var newIndex = $thisPlugin.$items.index($thisPlugin.$container.find('.is-selected'));
		var positionToMoveTo = $thisPlugin.getPositionToMoveTo( newIndex );
		$thisPlugin.animate( positionToMoveTo );
	};

	Plugin.prototype.move = function( $this, direction ) {
		
		var newIndex;
		var isAtEnded;
		var positionToMoveTo;
		
		var $newThis = false;
		var responsiveConfig = this.options.responsiveConfig;
		var $selectedItem = this.$container.find('.is-selected');
		var selectedIndex = this.$items.index($selectedItem) > 0 ? this.$items.index($selectedItem) : 0;

		if(direction === "forward") {
			if( $this.is('.is-ended') ) {
				newIndex = 0;
				$newThis = $( this.options.previous );
				isAtEnded = true;
				
			} else if(selectedIndex + responsiveConfig.itemsPerView > (this.itemsLength - 1) - responsiveConfig.itemsPerView) {
				newIndex = this.itemsLength - responsiveConfig.itemsPerView;
				isAtEnded = true;
			} else {
				newIndex = selectedIndex + responsiveConfig.itemsPerView;
				isAtEnded = false;
			}
			
			if(this.options.lazyLoad) {
				ImageLoader.getImages(this.$items, newIndex, this.options.responsiveConfig.itemsPerView);
			}

		} else {
			if( $this.is('.is-ended') ) {
				newIndex = this.itemsLength - responsiveConfig.itemsPerView;
				$newThis = $( this.options.next );
				isAtEnded = true;
				
			} else if(selectedIndex - responsiveConfig.itemsPerView <= 0) {
				newIndex = 0;
				isAtEnded = true;
			} else {
				newIndex = selectedIndex - responsiveConfig.itemsPerView;
				isAtEnded = false;
			}
		}
		
		if($newThis) {
			this.setAtEnd($newThis, isAtEnded);
		} else {
			this.setAtEnd($this, isAtEnded);
		}

		positionToMoveTo = this.getPositionToMoveTo(newIndex);
		this.animate( positionToMoveTo );
		
		this.setSelected( newIndex );
	};

	Plugin.prototype.getPositionToMoveTo = function( newIndex ) {
		return this.$items.eq(newIndex).position().left * -1;
	};

	Plugin.prototype.setSelected = function(index) {
		this.$container.find('.is-selected').removeClass('is-selected');
		this.$items.eq(index).addClass('is-selected');
	};
	Plugin.prototype.isDisabled = function(elem) {
		return elem.hasClass("is-ended");
	};
	Plugin.prototype.setAtEnd = function(elem, disable) {
		var functionName = disable ? "addClass" : "removeClass";
		this.$element.find(this.options.next + ', ' + this.options.previous).removeClass("is-ended");
		elem[functionName]("is-ended");
	};

	Plugin.prototype.animate = function( positionToMoveTo ) {
		
		if(Modernizr.csstransitions) {
			this.$container.css({
				left: positionToMoveTo
			});
			
		} else {
			
			this.$container.animate({
					left: positionToMoveTo
				}, {
					easing: 'easeInOutExpo',
					duration: 500
				});
			
		}
		
	};

	Plugin.prototype.destroy = function() {
		this.resetMeasurements();
		this.resetSelected();
		this.resetButtons();
		this.removeEvents();
		this.removeData();
	};

	Plugin.prototype.removeData = function() {
		this.$element.removeData('plugin_' + pluginName);
	};
	
	Plugin.prototype.removeEvents = function () {
		this.$element.find(this.options.next + ', ' + this.options.previous).off('click', this.processClick);
	};

	Plugin.prototype.resetMeasurements = function() {
		var resetCss = {
			width: '',
			'margin-left': '',
			left: ''
		};
		this.$container.css(resetCss);
		this.$items.each(function(){
			$(this).css(resetCss);
		});
	};

	Plugin.prototype.resetSelected = function() {
		this.$container.find('.is-selected').removeClass('is-selected');
		this.$items.first().addClass('is-selected');
	};

	Plugin.prototype.resetButtons = function() {
		this.$element.find(this.options.previous).addClass('is-ended');
		this.$element.find(this.options.next).removeClass('is-ended');
	};

	$.fn[pluginName] = function(options) {
		
		if(options === 'destroy') {
			var plugin = $(this).data('plugin_' + pluginName);
			if(!plugin) {
				return;
			}
			plugin.destroy();
			return;
		}

		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);