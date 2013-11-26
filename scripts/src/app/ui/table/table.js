define(['jquery'], function($) {

	'use strict';

	return {
		setResponsive: function($original) {
			$original.wrap("<div class='table-responsive-wrapper' />");

			var $copy = $original.clone();

			$copy.find("td:not(:first-child), th:not(:first-child)")
				.css("display", "none");
			$copy.removeClass("table-responsive");

			$original.closest(".table-responsive-wrapper")
				.append($copy);
			$copy.wrap("<div class='table-responsive-pinned' />");
			$original.wrap("<div class='table-responsive-scrollable' />");
		},

		destroyResponsive: function($original) {
			$original.closest(".table-responsive-wrapper")
				.find(".table-responsive-pinned")
				.remove();
			$original.unwrap();
			$original.unwrap();
		}
	};
});