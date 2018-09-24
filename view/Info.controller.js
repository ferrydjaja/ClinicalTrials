sap.ui.controller("view.Info", {

    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();

		// HTML string bound to the formatted text control
				var oModel = new sap.ui.model.json.JSONModel({
					HTML : "<h3><strong>IMPORTANT</strong></h3>" +
					"<p>Listing a study does not mean it has been evaluated by the U.S. Federal Government.</p>" +
					"<p>Read our <a href=\"//clinicaltrials.gov/ct2/about-site/disclaimer\" style=\"color:green; font-weight:600;\">disclaimer </a>for details.</p>"
				
				});
				this.getView().setModel(oModel);

    },

    doNavBack: function(event) {
        this.bus.publish("nav", "back");
    },




});