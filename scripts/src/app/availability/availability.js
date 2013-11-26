define(['jquery', 'app/ui/mediaqueries/mediaqueries', 'app/ui/table/table'], function ($, MediaQueries) {

	'use strict';

	return {
		init: function () {
			this._initSubscriptions();
			this.InitListAvailability();
		},
		_initSubscriptions: function () {
			$.subscribe('/availability/get', $.proxy(this.InitListAvailability, this));
		},
		// AVAILABILITY on List  =============================================================
		InitListAvailability: function () {
			var module = this;
			$("table.has-availability-lookup").filter(':has(.script-required)').each(function () {

				var $table = $(this);
				var $row = $table.find(".data-row");
				$row.find("td.script-required").html('Fetching Availability...').removeClass('.script-required');
				var nodeId = $table.data("node-id");
				var dateIn = $("#check-in input").val();
				if (dateIn === $("#check-in input").attr("placeholder")) {
					dateIn = '';
				}
				var dateOut = "";
				var thisData = "{'nodeID': '" + nodeId + "' ,'DateIn': '" + dateIn + "', 'DateOut': '" + dateOut + "' }";
				//thisData = "{'nodeID': '10972' ,'DateIn': '2009-06-09', 'DateOut': '2009-06-10' }"; // test

				$.ajax({
					type: "POST",
					url: "/scripts/src/app/availability/Availability.json.aspx/GetAvailabilityHtml",
					data: thisData,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (msg) {
						$row.find("td.loading").replaceWith(msg.d);
						// Do something interesting here.
						module.CheckRows();
					},
					error: function (msg) {
						$row.find("td").html(msg.statusText);
					}
				});
			});
		},

		CheckRows: function () {
			$("table#availability tr").each(function () {
				if ($(this).find('.no-bookings, .load-error').length > 0) {
					$(this).hide();
				}
			});
		},

		// AVAILABILITY on Detail =============================================================
		InitDetailAvailability: function () {
			var $availability = $(".js-availability.js-single-property");
			$availability.find("select").show();
			$availability
				.show()
				.on('availability.ready', function () {
					MediaQueries.initResponsiveTables();
				});

			if ($availability.length > 0) {
				this.UpdateRoomsAndAvailabilityPane('?altTemplate=RoomsAndAvailabilityPane&action=BookNow');
			}

			$('body').on('click', '.js-availability a[href*="action=BookNow"]', { module: this }, function (event) {
				var url;
				if ($(this).attr("href").indexOf("booknow.aspx") > -1) {
					url = $(this).attr("href").replace(/booknow\.aspx/, "RoomsAndAvailabilityPane.aspx").replace(/\#.*/, "");
				} else {
					url = $(this).attr("href").replace(/\?/, "?altTemplate=RoomsAndAvailabilityPane&").replace(/\#.*/, "");
				}
				event.data.module.UpdateRoomsAndAvailabilityPane(url);

				return false;
			});

			$('.js-availability').on('change', 'select', { module: this }, function(event) {
				var url = $(this).val().replace( /\?/ , "?altTemplate=RoomsAndAvailabilityPane&").replace( /\#.*/ , "");
				event.data.module.UpdateRoomsAndAvailabilityPane(url);
			});

			$(".js-availability.multiple-properties th").hover(
				function () {
					var infopane = $(this).find(".product-detail div");
					var infolink = $(this).find("a").eq(0).attr("href");
					$(this).find(".product-detail").show();
					if (!infopane.hasClass('loaded')) {
						$.ajax({
							url: infolink + "?altTemplate=AvailabilityInfoPane",
							dataType: 'html',
							success: function (html) {
								infopane.html(html);
								infopane.addClass('loaded');
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								infopane.html("<div class='inner'><h2>Sorry, There was a problem loading this info.</h2><p>" + textStatus + "</p></div>");
							}
						});
					}
				},
				function () {
					$(this).find(".product-detail").hide();
				}
			);
		},

		UpdateRoomsAndAvailabilityPane: function (url) {
			$(".js-availability.js-single-property").html("<h2>Loading Availability...</hd>").addClass("open loading enclosure-top");
			$.ajax({
				url: url,
				complete: function (request, statusMessage) {
					$(".js-availability")
						.removeClass("loading")
						.trigger('availability.ready');
				},
				success: function (html) {
					$(".js-availability").html(html);
				},
				error: function (request, statusMessage, error) {
					$(".js-availability").html(""); // "<h2 class=\"error\">" + statusMessage + "</h2>" + request.statusText + "<div class=\"hidden\">" + request.responseText + "</div>" );
				}
			});
		}
	};
});

