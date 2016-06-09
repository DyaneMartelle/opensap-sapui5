// Week 2 - Bonus Exercise - Map Location Formatter
// http://staticmapmaker.com/google/

sap.ui.define([], function() {
	"use strict";

	return {
		apply: function(sHouseNumber, sStreet, sCity) {
			var staticmap = "https://maps.googleapis.com/maps/api/staticmap?";
			var fullAddress = sHouseNumber + sStreet + sCity;
			var size = "400x400";
			var zoom = "13";
			var maptype = "roadmap";
			var markers = "size:mid%7Ccolor:0xff0000%7Clabel:1%7C";

			return staticmap + "center=" + fullAddress +
				"&zoom=" + zoom + "&scale=false" + "&size=" + size + "&maptype=" + maptype +
				"&markers=" + markers + fullAddress;
		}
	};
});