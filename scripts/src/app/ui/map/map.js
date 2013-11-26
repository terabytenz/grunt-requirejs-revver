define(['jquery', 'raphael', 'pubsub', 'app/ui/map/pod', 'app/ui/map/data', 'throttledebounce'], function($, Raphael, pubsub, Pod, MapData) {

	'use strict';

	var isIE = !!$('.oldie').length;

	return {
		chc: { },
		markers: [],
		sets: { },
		text: { },
		raphael: null,
		init: function() {
			this._setUpMap();
			this._drawMap();
			this._createSets();
			this._initEvents();
		},
		_setUpMap: function() {
			this.raphael = Raphael("map-chc", isIE ? '950' : '100%', isIE ? '543' : '100%');
			this.raphael.setViewBox(10, 10, isIE ? 950 : 850, 500, true);
		},
		_drawMap: function() {
			this._addMainMap();
			this._addRegionShadows();
			this._addRegions();
			this._addIcons();
			this._addMarkersShadow();
			this._addMarkers();
			this._addMarkerText();
			this._addLinkTriangles();
		},
		_createSets: function() {
			for (var region in this.chc) {

				if (region !== 'main' && region !== 'border' && region !== 'mainBorder' && region.indexOf('Shadow') === -1 && region.indexOf('Icon') === -1) {

					var set = this.raphael.set();
					var iconSet = {
						'aoraki': function() {
							set.push(
								this.iconMountain,
								this.skiingIcon
							);
						},
						'midcanterbury': function () {
							set.push(
								this.treeIcon,
								this.bikeIcon
							);
						},
						'hanmer': function() {
							set.push(
								this.balloonIcon
							);
						}
					};

					set.push(
						this.chc[region],
						this.markers[region],
						this.text[region]
					);

					if (iconSet[region]) {
						iconSet[region]();
					}

					this.sets[region] = set;
				}
			}
		},
		_addMainMap: function() {
			var mainAttr = {
				fill: "#ffefcf",
				stroke: 'none'
			};
			var mainShadowAttr = {
				stroke: 'none',
				fill: '#839594',
				transform: 't0,8'
			};
			var borderAttr = {
				stroke: '#584843',
				'stroke-width': 2,
				'stroke-miterlimit': 3,
				'stroke-dasharray': '-'
			};
			this.chc.mainBorder = this.raphael.path(MapData.data.main).attr(mainShadowAttr);
			this.chc.main = this.raphael.path(MapData.data.main).attr(mainAttr);
			this.chc.border = this.raphael.path(MapData.data.border).attr(borderAttr);
		},
		_addRegionShadows: function() {
			var regionShadowAttr = {
				stroke: 'none',
				fill: '#839594',
				transform: 't0,5',
				'fill-opacity': 0
			};
			this.chc.kaikouraShadow = this.raphael.path(MapData.data.kaikoura).attr(regionShadowAttr);
			this.chc.hanmerShadow = this.raphael.path(MapData.data.hanmer).attr(regionShadowAttr);
			this.chc.selwynShadow = this.raphael.path(MapData.data.selwyn).attr(regionShadowAttr);
			this.chc.waimakaririShadow = this.raphael.path(MapData.data.waimakariri).attr(regionShadowAttr);
			this.chc.christchurchShadow = this.raphael.path(MapData.data.christchurch).attr(regionShadowAttr);
			this.chc.banksShadow = this.raphael.path(MapData.data.banks).attr(regionShadowAttr);
			this.chc.midcanterburyShadow = this.raphael.path(MapData.data.midcanterbury).attr(regionShadowAttr);
			this.chc.southShadow = this.raphael.path(MapData.data.south).attr(regionShadowAttr);
			this.chc.aorakiShadow = this.raphael.path(MapData.data.aoraki).attr(regionShadowAttr);
		},
		_addRegions: function() {
			var regionAttr = {
				fill: "#e5372c",
				stroke: 'none',
				'fill-opacity': 0
			};
			this.chc.kaikoura = this.raphael.path(MapData.data.kaikoura).attr(regionAttr);
			this.chc.hanmer = this.raphael.path(MapData.data.hanmer).attr(regionAttr);
			this.chc.selwyn = this.raphael.path(MapData.data.selwyn).attr(regionAttr);
			this.chc.waimakariri = this.raphael.path(MapData.data.waimakariri).attr(regionAttr);
			this.chc.christchurch = this.raphael.path(MapData.data.christchurch).attr(regionAttr);
			this.chc.banks = this.raphael.path(MapData.data.banks).attr(regionAttr);
			this.chc.midcanterbury = this.raphael.path(MapData.data.midcanterbury).attr(regionAttr);
			this.chc.south = this.raphael.path(MapData.data.south).attr(regionAttr);
			this.chc.aoraki = this.raphael.path(MapData.data.aoraki).attr(regionAttr);
		},
		_addIcons: function() {
			var iconAttr = {
				stroke: 'none',
				fill: "#584742"
			};

			var iconWhiteAttr = {
				stroke: 'none',
				fill: "#fff"
			};
			this.mountainIcon = this.raphael.path(MapData.data.mountainIcon).attr(iconAttr);
			this.balloonIcon = this.raphael.path(MapData.data.balloonIcon).attr(iconAttr);
			this.treeIcon = this.raphael.path(MapData.data.treeIcon).attr(iconAttr);
			this.skiingIcon = this.raphael.path(MapData.data.skiingIcon).attr(iconAttr);
			this.bikeIcon = this.raphael.path(MapData.data.bikeIcon).attr(iconAttr);

			this.whaleIcon = this.raphael.path(MapData.data.whaleIcon).attr(iconWhiteAttr);
			this.boatIcon = this.raphael.path(MapData.data.boatIcon).attr(iconWhiteAttr);
			this.kayakIcon = this.raphael.path(MapData.data.kayakIcon).attr(iconWhiteAttr);
		},
		_addMarkers: function() {
			var markerAttr = {
				stroke: 'none',
				fill: "#584742"
			};
			this.markers.aoraki = this.raphael.path(MapData.data.aorakiMarker).attr(markerAttr);
			this.markers.south = this.raphael.path(MapData.data.southMarker).attr(markerAttr);
			this.markers.midcanterbury = this.raphael.path(MapData.data.midcanterburyMarker).attr(markerAttr);
			this.markers.selwyn = this.raphael.path(MapData.data.selwynMarker).attr(markerAttr);
			this.markers.waimakariri = this.raphael.path(MapData.data.waimakaririMarker).attr(markerAttr);
			this.markers.christchurch = this.raphael.path(MapData.data.christchurchMarker).attr(markerAttr);
			this.markers.banks = this.raphael.path(MapData.data.banksMarker).attr(markerAttr);
			this.markers.hanmer = this.raphael.path(MapData.data.hanmerMarker).attr(markerAttr);
			this.markers.kaikoura = this.raphael.path(MapData.data.kaikouraMarker).attr(markerAttr);
		},
		_addLinkTriangles: function() {
			var LinkTriangles = {
				stroke: 'none',
				fill: '#ffefcf'
			};
			this.aorakiTriangles = this.raphael.path(MapData.data.aorakiTriangle).attr(LinkTriangles);
			this.southTriangles = this.raphael.path(MapData.data.southTriangle).attr(LinkTriangles);
			this.midcanterburyTriangles = this.raphael.path(MapData.data.midcanterburyTriangle).attr(LinkTriangles);
			this.selwynTriangles = this.raphael.path(MapData.data.selwynTriangle).attr(LinkTriangles);
			this.waimakaririTriangles = this.raphael.path(MapData.data.waimakaririTriangle).attr(LinkTriangles);
			this.christchurchTriangles = this.raphael.path(MapData.data.christchurchTriangle).attr(LinkTriangles);
			this.banksTriangles = this.raphael.path(MapData.data.banksTriangle).attr(LinkTriangles);
			this.hanmerTriangles = this.raphael.path(MapData.data.hanmerTriangle).attr(LinkTriangles);
			this.kaikouraTriangles = this.raphael.path(MapData.data.kaikouraTriangle).attr(LinkTriangles);
		},
		_addMarkersShadow: function() {
			var markerShadowAttr = {
				stroke: 'none',
				transform: 't-2,5',
				fill: '#839594',
				opacity: '0.8'
			};
			this.aorakiMarkerShadow = this.raphael.path(MapData.data.aorakiMarker).attr(markerShadowAttr);
			this.southMarkerShadow = this.raphael.path(MapData.data.southMarker).attr(markerShadowAttr);
			this.midcanterburyMarkerShadow = this.raphael.path(MapData.data.midcanterburyMarker).attr(markerShadowAttr);
			this.selwynMarkerShadow = this.raphael.path(MapData.data.selwynMarker).attr(markerShadowAttr);
			this.waimakaririMarkerShadow = this.raphael.path(MapData.data.waimakaririMarker).attr(markerShadowAttr);
			this.christchurchMarkerShadow = this.raphael.path(MapData.data.christchurchMarker).attr(markerShadowAttr);
			this.banksMarkerShadow = this.raphael.path(MapData.data.banksMarker).attr(markerShadowAttr);
			this.hanmerMarkerShadow = this.raphael.path(MapData.data.hanmerMarker).attr(markerShadowAttr);
			this.kaikouraMarkerShadow = this.raphael.path(MapData.data.kaikouraMarker).attr(markerShadowAttr);
		},
		_addMarkerText: function() {
			var textAttr = {
				font: isIE ? '11px Verdana' : '17px LondrinaSolidRegular',
				'font-weight': isIE ? 'bold' : 'normal',
				textAlign: 'left',
				fill: "#ffefcf",
				'text-anchor': 'start'
			};

			var text = MapData.data.text;
			for (var i = 0; i < text.length; i++) {
				var current = text[i];
				this.text[current.id] = this.raphael.text(current.x, current.y, current.title).attr(textAttr);
			}
		},
		_initEvents: function() {
			var proxy = this;
			var bounceEasing = 'cubic-bezier(0.680, -0.550, 0.265, 1.550)';
			var mouseOverRegion = {
				'fill-opacity': 1,
				transform: 's1.1'
			};
			var mouseOutRegion = {
				'fill-opacity': 0,
				transform: 's1'
			};
			var mouseOverRegionShadow = {
				'fill-opacity': 0.5,
				transform: 't0,5s1.1'
			};
			var mouseOutRegionShadow = {
				'fill-opacity': 0,
				transform: 't0,5s1'
			};
			var mouseOverMarker = {
				fill: '#a41800'
			};
			var mouseOutMarker = {
				fill: '#584742'
			};

			for (var region in this.sets) {

				var currentSet = this.sets[region];
				var path = this.chc[region];
				var marker = this.markers[region];
				var shadow = this.chc[region + 'Shadow'];

				(function(savedSet, savedPath, savedShadow, savedRegion, savedMarker) {
					savedSet.attr({
						cursor: 'pointer'
					});
					savedSet.hover($.debounce(250, function() {
						savedShadow.animate(mouseOverRegionShadow, 250, bounceEasing, function() {
							if ($('.oldie #map-pod, .ie9 #map-pod').length > 0) {
								$('#map-pod').fadeIn(250);
								$('#map-intro').fadeOut(250);
							} else {
								$('#map-pod').removeClass('is-hidden').addClass('is-visible');
							}
						});
						savedPath.animate(mouseOverRegion, 250, bounceEasing);
						savedMarker.animate(mouseOverMarker, 250, 'easeInOutExpo');
						if (savedRegion !== Pod.getCurrentRegion()) {
							proxy._updatePod.call(proxy, savedRegion);
						}
					}), $.debounce(250, function() {
						savedShadow.animate(mouseOutRegionShadow, 250, bounceEasing, function() {
							if ($('.oldie #map-pod, .ie9 #map-pod').length > 0) {
								$('#map-pod').fadeOut(250);
								$('#map-intro').fadeIn(250);
							} else {
								$('#map-pod').removeClass('is-visible').addClass('is-hidden');
							}
						});
						savedPath.animate(mouseOutRegion, 250, bounceEasing);
						savedMarker.animate(mouseOutMarker, 250, 'easeInOutSine');
					}));
					savedSet.click(function() {
						proxy._goToUrl(savedRegion);
					});
				})(currentSet, path, shadow, region, marker);
			}
		},
		_updatePod: function(region) {
			var data = this._getRegionData(region);
			$.publish('/map/update', [data]);
		},
		_goToUrl: function(region) {
			var data = this._getRegionData(region);
			window.open(data.url, '_self');
		},
		_getRegionData: function(region) {
			var data = { };
			var $region = $('[data-region="' + region + '"]').closest('li');
			var img = $region.find('img')[0];
			var $heading = $region.find('.js-map-heading');

			data.region = region;
			data.src = img.getAttribute('data-original');
			data.alt = img.alt;
			data.url = $heading[0].href;
			data.heading = $heading.text();
			data.copy = $region.find('.js-map-copy').text();

			return data;
		}
	};
	
});