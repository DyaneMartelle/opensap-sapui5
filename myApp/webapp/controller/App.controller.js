/*
This asynchronous module definition (AMD) syntax allows to clearly separate 
module loading from code execution and greatly improves the performance of
the application. The browser can decide when and how the code resources 
are loaded before executing them.
*/

sap.ui.define([
	"sap/ui/core/mvc/Controller", //  required modules with fully qualified path
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"opensap/myapp/model/formatter", // new module made by us
	"opensap/myapp/model/formatMapUrl" // Week 2 - Bonus Exercise

], function(Controller, MessageToast, Filter, FilterOperator, formatter, formatMapUrl) { // <<--- it's mandatory use the module as arguments
	"use strict";

	return Controller.extend("opensap.myapp.controller.App", {

		formatter: formatter,
		formatMapUrl: formatMapUrl,

		//-----------------------------------------------------------------------------------------------
		/**
		 * Event handlers are prefixed with on.
		 * This is used at button on View:
		 * <Button text="Say Hello!" press="onShowHello"/>
		 */
		onShowHello: function() {
			// Read message from i18n model (i18n\i18n.properties)
			var oBundle = this.getView().getModel("i18n").getResourceBundle();

			// Read name from Json file (model\HelloPanel.json)
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");

			// Get the translated value from i18n.properties and do a concatenation with json property 'name'
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// use the module MessageToast to display the text
			MessageToast.show(sMsg);
		},
		//-----------------------------------------------------------------------------------------------

		/**
		 * Applying filters (and sorters) can be done using the list’s ‘items’ binding. So we first retrieve 
		 * the list control using its id suffix ‘productList’. The control object gives us access to the list 
		 * binding object. Now we can create our filter object for field ‘ProductId’. 
		 * 
		 * We choose a filter operator and fetch the search field value from the handler function’s 
		 * event parameter. Finally, we can call the binding’s filter method with our new filter.  
		 */
		onFilterProducts: function(oEvent) {
			// build filter array
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));

				// apply filter. an empty filter array simply removes the filter
				// which will make all entries visible again
				oBinding.filter(aFilter);
			}
		},
		//-----------------------------------------------------------------------------------------------

		/** When a user selects an item in our product list, we want to get the binding path from this 
		    item, and pass it to our panel, using the bindElement method. 
		    
		    As this is an event handler, it receives the Event object from the framework. From this object, 
		    we can get the control which has triggered the event by using oEvent.getSource().
		*/
		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");

			oProductDetailPanel.bindElement({
				path: sPath
			});

			this.byId("productDetailsPanel").setVisible(true);
		}

		//-----------------------------------------------------------------------------------------------
	});

});