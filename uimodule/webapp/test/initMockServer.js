sap.ui.define([
	"sap/ui/demo/mockserver/localService/MockServer"
], function(
	MockServer
) {
	"use strict";
    // initialize the mock server 
    MockServer.init();

    // initialize the embedded component on the HTML page

    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});