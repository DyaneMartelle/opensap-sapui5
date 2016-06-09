/*
Components are independent and reusable parts used in SAPUI5 applications. 
For example, SAP Fiori apps usually run in an SAP Fiori launchpad which 
acts as a so-called component container. It manages and loads the apps 
by loading the corresponding component of the app. 
Whenever we address resources of the app, we will now do this relatively
to the component (instead of relatively to the index.html). 

This architectural change allows our app to be used in more flexible 
environments than our static index.html page.

Component.js file will hold our application setup. 
The init function of the component is automatically invoked by SAPUI5 
when the component is instantiated
*/

sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("opensap.myapp.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// turns off batch processing to be able to debug calls from the ODataModel 
			// to the server easily. By default, batch processing is turned on in SAPUI5, 
			// so all calls that would otherwise be sent to a server in a single request 
			// are composed to a batch request that combines multiple requests.
			this.getModel().setUseBatch(false);

			// additional initialization can be done here
		}

	});
});