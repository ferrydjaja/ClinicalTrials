jQuery.sap.require("sap.ui.layout.form.SimpleForm");

sap.ui.jsview("view.CT", {

    getControllerName: function() {
        return "view.CT";
    },

    createContent: function(oController) {
		var initialKey = 0;

		var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({text:'{i18n>MSG0}', title: '{i18n>MSG1}'});

		function wasteTime(){
			busyDialog.open();
        }

		function runNext(){
			busyDialog.close();
		}
		
		// *************************** Advanced Search **************************************************************************************
		var oFormAS = new sap.ui.layout.form.SimpleForm({
			minWidth        : 1024,
			maxContainerCols: 2,
			editable        : true,
			layout          : "ResponsiveGridLayout",
			//title           : "Date Controls",
			labelSpanL : 4,
			labelSpanM : 4,
			emptySpanL : 0,
			emptySpanM : 0,
			columnsL   : 1,
			columnsM   : 1		
		});

		var oConditionAS = new sap.m.Label({
			text : "Condition",
		});
		var oConditionTextAS = new sap.m.Select('selectConditionAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oConditionTextAS.setModel(sap.ui.getCore().getModel('oConditionModel'));
		oConditionTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{desc}',
				key: '{code}'
			 })
		});


		var oCountryAS = new sap.m.Label({
			text : "Country",
		});
		var oCountryTextAS = new sap.m.Select('selectCountryAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
				if(oEvent.getParameters().selectedItem.getKey() != 'US') {
					oStateTextAS.setValue("");
					oStateTextAS.setEnabled(false);
				}
				else {
					oStateTextAS.setValue("");
					oStateTextAS.setEnabled(true);
				}
			 }.bind(this)
		});
		oCountryTextAS.setModel(sap.ui.getCore().getModel('oCountryModel'));
		oCountryTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{country}',
				key: '{code}'
			 })
		});


		var oStateAS = new sap.m.Label({
			text : "State",
		});
		var oStateTextAS = new sap.m.Input('selectStateAS', {
			placeholder: "Enter state for U.S country",
			change: function(oEvent) {
				console.log(oEvent.getParameters());
			}.bind(this),
			showSuggestion: true,
		});
		oStateTextAS.setModel(sap.ui.getCore().getModel('oStateModel'));
		oStateTextAS.bindAggregation("suggestionItems",{
			path:"/",
			template: new sap.ui.core.Item({
				text:"{state}",
				key: '{code}'
			})
		});

		var oCityAS = new sap.m.Label({
			text : "City",
		});
		var oCityTextAS = new sap.m.Input('selectCityAS', {
		});

		var oDistanceAS = new sap.m.Label({
			text : "Distance",
		});
		var oDistanceTextAS = new sap.m.Select('selectDistanceAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oDistanceTextAS.setModel(sap.ui.getCore().getModel('oDistanceModel'));
		oDistanceTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{distance}',
				key: '{code}'
			 })
		});

		var oGenderAS = new sap.m.Label({
			text : "Gender",
		});
		var oGenderTextAS = new sap.m.Select('selectGenderAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oGenderTextAS.setModel(sap.ui.getCore().getModel('oGenderModel'));
		oGenderTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{gender}',
				key: '{code}'
			 })
		});

		var oAgeAS = new sap.m.Label({
			text : "Age",
		});
		var oAgeTextAS = new sap.m.Select('selectAgeAS', {
			selectedKey: -1,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oAgeTextAS.setModel(sap.ui.getCore().getModel('oAgeModel'));
		oAgeTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{age}',
				key: '{code}'
			 })
		});

		var oTrialStatusAS = new sap.m.Label({
			text : "Trial Status",
		});
		var oTrialStatusTextAS = new sap.m.Select('selectTrialStatusAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oTrialStatusTextAS.setModel(sap.ui.getCore().getModel('oTrialStatusModel'));
		oTrialStatusTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{trialstatus}',
				key: '{code}'
			 })
		});

		var oBtnAddAS = new sap.m.Button({
            text : "Search",
        	press : function(oEvent){
				var cond = oConditionTextAS.getSelectedKey().trim();
				var cntry = oCountryTextAS.getSelectedKey().trim();
				var state = oStateTextAS.getSelectedKey().trim();
				var city = oCityTextAS.getValue().trim();
				var gndr = oGenderTextAS.getSelectedKey().trim();
				var recrs = oTrialStatusTextAS.getSelectedKey().trim();
				var age = oAgeTextAS.getSelectedKey().trim();
				var dist = oDistanceTextAS.getSelectedKey().trim();

				if(cond.length > 0 && cntry.length > 0) {
					console.log(cond + ':' + cntry + ':' + state + ':' + city + ':' + gndr + ':' + recrs + ':' + ':' + age + ':' + dist);
			
					wasteTime();
									
					//** Offline mode **
					/*
					oModel = new sap.ui.model.json.JSONModel("model/list.json");
					oController.onNavButtonTo(oEvent,  "fd:18");
					*/
					//** Offline mode **




					//** Online mode **
					
					oModel = new sap.ui.model.json.JSONModel();
					oModel.setSizeLimit(999999);

					$.ajax({
						type: 'GET',
						async: true,
						cache: true,
						url: "/nodejs?cond=" + cond + "&cntry=" + cntry + "&state=" + state +  "&city=" + city + "&recrs=" + recrs + "&gndr=" + gndr + "&age=" + age + "&dist=" + dist,
						//url: "http://10.44.136.163/nodejs?
						success: function (data) {
							console.log(data);

							if(data != "{}") {
								runNext();
								

								oModel.setData({
									//modelData : [JSON.parse(data).results]
									modelData : [JSON.parse(data)]
								});

								oController.onNavButtonTo(oEvent,  "fd:18");
							} else {
								runNext();
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.show(jQuery.sap.resources({url : "i18n/i18n.properties"}).getText("NO_INFO"), {
									icon: sap.m.MessageBox.Icon.INFORMATION,      
									title: "{i18n>WELCOME_TITLE}",                             
									actions: sap.m.MessageBox.Action.OK,    
									onClose: null,                         
									//styleClass: ""                        
								});
							}
								
						},
						error: function(jqXHR, textStatus, errorThrown) { 
							runNext();
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.show(errorThrown, {
								icon: sap.m.MessageBox.Icon.INFORMATION,     
								title: "{i18n>WELCOME_TITLE}",                             
								actions: sap.m.MessageBox.Action.OK,    
								onClose: null,                          
								//styleClass: ""                         
							});
						}
					});
					
					//** Online mode **
				} else {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show(jQuery.sap.resources({url : "i18n/i18n.properties"}).getText("VALID_KEYWORD"), {
						icon: sap.m.MessageBox.Icon.INFORMATION,      
						title: "{i18n>WELCOME_TITLE}",                             
						actions: sap.m.MessageBox.Action.OK,    
						onClose: null,                         
						//styleClass: ""                        
					});
				}		
        	} 
        });

		
		oFormAS.addContent(oConditionAS);
		oFormAS.addContent(oConditionTextAS);
		oFormAS.addContent(oCountryAS);
		oFormAS.addContent(oCountryTextAS);
		oFormAS.addContent(oStateAS);
		oFormAS.addContent(oStateTextAS);
		oFormAS.addContent(oCityAS);
		oFormAS.addContent(oCityTextAS);
		oFormAS.addContent(oDistanceAS);
		oFormAS.addContent(oDistanceTextAS);
		oFormAS.addContent(oGenderAS);
		oFormAS.addContent(oGenderTextAS);
		oFormAS.addContent(oAgeAS);
		oFormAS.addContent(oAgeTextAS);
		oFormAS.addContent(oTrialStatusAS);
		oFormAS.addContent(oTrialStatusTextAS);
		// *************************** Advanced Search **************************************************************************************

        var page = new sap.m.Page({
			showNavButton: true,
            enableScrolling: true,
            navButtonPress: [oController.doNavBack, oController],
            customHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Label("title", {
                    text: "Clinical Trials",
                    design: "Bold"
                })]
            })
		});


		var oIconTabBar = new sap.m.IconTabBar({
			expandable: true,
            items: [
               new sap.m.IconTabFilter({
                    text: "Search",
					icon : "sap-icon://inspection",  
                    content : [
						new sap.m.VBox({items:[oFormAS, oBtnAddAS]})
					]
                }),  
            ],

        });  

	
		page.addContent(oIconTabBar);
		//page.setEnableScrolling(false);
		
		return page;
	}

});