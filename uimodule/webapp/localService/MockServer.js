sap.ui.define([
	"sap/ui/thirdparty/jquery",
	"sap/ui/core/date/UI5Date",
	"sap/ui/core/util/MockServer",
	"sap/base/Log"
	
], function(jQuery, UI5Date, MockServer, Log) {
	'use strict';
	return {
		init: function(){
			// create 
			var oMockServer = new MockServer({
				rootUri: "/"
			});

			oMockServer.simulate("../localService/metadata.xml", {
				sMockdataBaseUrl: "../localService/mockdata",
				bGenerateMissingMockData: true
			});

			// handling mocking a function import call step
			var aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "GET",
				path: new RegExp("FindUpcomingMeetups(.*)"),
				response: function(oXhr) {
					Log.debug("Incoming request for FindUpcomingMeetups");
					var today = UI5Date.getInstance();
					today.setHours(0); // or today.toUTCString(0) due to timezone differences
					today.setMinutes(0);
					today.setSeconds(0);
					jQuery.ajax({
						url: "/Meetups?$filter=EventDate ge " + "/Date(" + today.getTime() + ")/",
						dataType : 'json',
						async: false,
						success : function(oData) {
							oXhr.respondJSON(200, {}, JSON.stringify(oData));
						}
					});
					return true;
				}
			});
			oMockServer.setRequests(aRequests);
			// handling custom URL parameter step
			var fnCustom = function(oEvent) {
				var oXhr = oEvent.getParameter("oXhr");
				if (oXhr && oXhr.url.indexOf("first") > -1) {
					oEvent.getParameter("oFilteredData").results.splice(3, 100);
				}
			};
			oMockServer.attachAfter("GET", fnCustom, "Meetups");

			

			/// start the mock server 
			oMockServer.start();

			Log.info("Running the app with mock data");
			

		}
	};
	
});