jQuery.sap.require("app.config");

sap.ui.jsview("view.App", {

    getControllerName: function() {
        return "view.App";
    },

    createContent: function(oController) {

		jQuery.sap.declare("app.ref.AppView"); 
		app.ref.AppView = this;


        // set i18n model
        var oI18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: "i18n/i18n.properties"
        });
        sap.ui.getCore().setModel(oI18nModel, "i18n");
        this.setModel(oI18nModel, "i18n");

		var oModelCountry = new sap.ui.model.json.JSONModel();
		oModelCountry.loadData("model/countries.json");
		oModelCountry.setSizeLimit(200);
		sap.ui.getCore().setModel(oModelCountry, "oCountryModel");

		var oModelState = new sap.ui.model.json.JSONModel();
		oModelState.loadData("model/usstate.json");
		oModelState.setSizeLimit(200);
		sap.ui.getCore().setModel(oModelState, "oStateModel");

		var oModelDistance = new sap.ui.model.json.JSONModel();
		oModelDistance.loadData("model/distance.json");
		sap.ui.getCore().setModel(oModelDistance, "oDistanceModel");

		var oModelCondition = new sap.ui.model.json.JSONModel();
		oModelCondition.loadData("model/condition.json");
		sap.ui.getCore().setModel(oModelCondition, "oConditionModel");

		var oModelGender = new sap.ui.model.json.JSONModel();
		oModelGender.loadData("model/gender.json");
		sap.ui.getCore().setModel(oModelGender, "oGenderModel");

		var oModelAge = new sap.ui.model.json.JSONModel();
		oModelAge.loadData("model/age.json");
		sap.ui.getCore().setModel(oModelAge, "oAgeModel");

		var oTrialStatus = new sap.ui.model.json.JSONModel();
		oTrialStatus.loadData("model/trialstatus.json");
		sap.ui.getCore().setModel(oTrialStatus, "oTrialStatusModel");

		
        // set device model
        var oDeviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone  && !app.config.LaunchpadMode,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
            listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive",
			launchpadMode: app.config.LaunchpadMode
        });
        oDeviceModel.setDefaultBindingMode("OneWay");
        sap.ui.getCore().setModel(oDeviceModel, "device");
        this.setModel(oDeviceModel, "device");

        // to avoid scrollbars on desktop the root view must be set to block display
        this.setDisplayBlock(true);

        this.app = new sap.m.SplitApp({
            afterDetailNavigate: function() {
                if (sap.ui.Device.system.phone || app.config.LaunchpadMode) {
                    this.hideMaster();
                }
            },
            homeIcon: {
                'phone': 'img/57_iPhone_Desktop_Launch.png',
                'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
                'tablet': 'img/72_iPad_Desktop_Launch.png',
                'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
                'favicon': 'img/favicon.ico',
                'precomposed': false
            }
        });
		if(app.config.LaunchpadMode){
            this.app.setMode(sap.m.SplitAppMode.HideMode);
        }

        this.app.addMasterPage(sap.ui.jsview("Menu", "view.Menu"));
		if(app.config.LaunchpadMode){
            this.app.addDetailPage(sap.ui.jsview("CT", "view.CT"));
        }
        this.app.addDetailPage(sap.ui.xmlview("Info", "view.Info"));
   	   // this.app.addDetailPage(sap.ui.jsview("CT", "view.CT"));
        this.app.addDetailPage(sap.ui.jsview("CTL1", "view.CTL1"));
		this.app.addDetailPage(sap.ui.xmlview("Detail", "view.Detail"));
 

		if(sap.ui.Device.system.desktop)
			this.app.setDefaultTransitionNameDetail("fade");

        // navigate to the first page in both master and detail areas.
        // the toMaster must be called after calling the toDetail, because both of them point to the same reference in phone and 
        // the real first page that will be shown in phone is the page in master area. 
        if(app.config.LaunchpadMode){
            this.app.toDetail("CT");
        } else {
			this.app.toDetail("CT");
			this.app.toMaster("CT");

		}

        return this.app;
    }
});