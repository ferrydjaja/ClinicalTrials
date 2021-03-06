sap.ui.jsview("view.CTL1", {

    getControllerName: function() {
        return "view.CTL1";
    },

    createContent: function(oController) {

        var app = new sap.m.App("L1");

		var oVBI = new sap.ui.vbm.GeoMap('vbi', {
			vos: [
				new sap.ui.vbm.Spots("spotsFD", {
					// bind to an array in the model
					items: {
						path : "/modelData/0/Spots",
						template: new sap.ui.vbm.Spot(  { text: "{value}", position: "{pos}", text: "{tooltip}", type: sap.ui.vbm.SemanticType.Success}  )
					}
				}),
			]
		});

		/*
		var oSpotsCollection = new sap.ui.vbm.Spots("spotsFD1",{
			items: {
				path : "/modelData/0/Spots",
				template: new sap.ui.vbm.Spot(  { text: "{value}", position: "{pos}", tooltip: "{tooltip}", type: sap.ui.vbm.SemanticType.Success}  )
			}
		});
		*/
		//oVBI.removeVo("spotsFDd");

		var oMapConfig = {
            "MapProvider": [{
                "type": "",
                "name": "HEREMAPS",
                "description": "",
                "tileX": "256",
                "tileY": "256",
                "maxLOD": "20",
                "copyright": "Tiles Courtesy of HERE Maps",
                "Source": [{
                    "id": "s1",
                    "url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
                }, {
                    "id": "s2",
                    "url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
                }]
            }],
            "MapLayerStacks": [{
                "name": "Default",
                "MapLayer": [{
                    "name": "layer1",
                    "refMapProvider": "HEREMAPS",
                    "opacity": "1.0",
                    "colBkgnd": "RGB(255,255,255)"
                }]
            }]
        };


        var sf = new sap.m.SearchField({
            placeholder: "Search",
            showRefreshButton: true,
            liveChange: Search,
            search: Search,
            tooltip: "Search for info..",
        });

        function Search(evt) {
            var searchValue = evt.oSource.mProperties.value;

            var filters = new Array();
            var filter1 = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter2 = new sap.ui.model.Filter("nct_id", sap.ui.model.FilterOperator.Contains, searchValue);

            var oCombinedOr = new sap.ui.model.Filter([filter1, filter2]);
            filters.push(oCombinedOr);

            //get list created in view
            this.oList = sap.ui.getCore().byId("polist");
            this.oList.getBinding("items").filter(filters);
        }

        var oListTemplate = new sap.m.ObjectListItem({
            type: "Active",
            title: "{title}",
            //icon: "sap-icon://goal",
			/*
			icon:{
				path: "eligibility/gender",
				formatter: function(subject){
					if(subject == 'All')
						return "sap-icon://icon-gender-male-and-female";
					if(subject == 'Male')
						return "sap-icon://BusinessSuiteInAppSymbols/icon-male";

					if(subject == 'Female')
						return "sap-icon://BusinessSuiteInAppSymbols/icon-female";

					console.log(subject);					
				}
			},
			*/
            intro: "{nct_id}",
            //number: "{condition_summary}",
            //numberUnit: "{condition_summary}",
			attributes: [
				new sap.m.ObjectAttribute({text: "{eligibility/gender} | {eligibility/minimum_age}"}),
				new sap.m.ObjectAttribute({text: "{last_update_submitted}"})
			],
			firstStatus: new sap.m.ObjectStatus({text: "{condition_summary}", state: "Success"}),
			secondStatus: new sap.m.ObjectStatus({text: "{status/_} | {status/open}", state: "Success"}),
			/*
			markers: [
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Favorite}),
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Flagged}),
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Draft})
			],
			*/
            press: handleOnPress
        });


		/*var oListTemplate = new sap.m.ObjectListItem({
			title: "New markers aggregation",
			number: "802",
			numberUnit: "Euro",
			numberState : sap.ui.core.ValueState.Success,
			attributes: [
				new sap.m.ObjectAttribute({text: "First Attribute."}),
				new sap.m.ObjectAttribute({text: "Second Attribute"})
			],
			firstStatus: new sap.m.ObjectStatus({text: "Critical Status", state: "Error"}),
			markers: [
						 new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Favorite}),
						 new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Flagged}),
						 new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Draft})
					 ]
		});
		*/


        var oList = new sap.m.List("polist",{
			growing : true,
			//headerText : "Growing List",
			inset : false,
			//footerText : "List Footer",
			growingThreshold : 5,
			//mode : sap.m.ListMode.Delete,
			growingTriggerText : "",
			showNoData: true,
			scrollToLoad: false
		});

        var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
            text: '{i18n>MSG0}',
            title: '{i18n>MSG1}'
        });

        function wasteTime() {
            busyDialog.open();
        }

        function runNext() {
            busyDialog.close();
        }

        function getLatitudeLongitude(address, callback) {
            /*
			//offline maps
			$.ajax({
                type: 'GET',
                async: true,
                cache: true,
                url: "/nodejs?loc=" + address,
                success: function(data) {
					callback(data);
				},
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log('error');
				   callback('no data');
                }
			});
			*/

            /*
			//Openstreetmap
			$.ajax({
				type: 'GET',
				url: "http://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURI(address),
  				encoding:"UTF-8",
  				dataType: "json",
  				async: true,		
				cache: true,
				success: function(data) {
					var lat = data[0].lat;
  					var lon = data[0].lon;
					data = {lat: lat, lng: lon};
					//console.log(data);
					callback(data);
				},
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(errorThrown);
				   callback('no data');
                }
			});
			*/

            //Heremap
            $.ajax({
                type: 'GET',
                url: "https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=" + encodeURI(address) + "&app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w",
                encoding: "UTF-8",
                dataType: "json",
                async: true,
                cache: true,
                success: function(data) {
                    console.log(address);
                    console.log(data);

                    if (data.Response.View.length > 0) {
                        var lat = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                        var lon = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                        data = {
                            lat: lat,
                            lng: lon
                        };
                        //console.log(data);
                        callback(data);
                    } else {
                        callback('no data')
                    };
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    callback('no data');
                }
            });
        }

        function FD(oEvent, nct_id, ArrayData, data, oController, position) {
            //This block is executed when all innerFunction calls are finished.
            if (!data.hasOwnProperty("required_header"))
                url = "N/A";
            else
                url = data.required_header.url;

            if (!data.hasOwnProperty("brief_title"))
                brief_title = "N/A";
            else
                brief_title = data.brief_title;

            if (!data.hasOwnProperty("official_title"))
                official_title = "N/A";
            else
                official_title = data.official_title;

            if (!data.hasOwnProperty("location_countries"))
                country = "N/A";
            else
                country = data.location_countries.country;

            /*
            console.log(data.location.length);
            var state = '';
            var stateArray = [];
            if(typeof data.location.length === 'undefined') {
            	state = data.location.facility.address.state;
            } else {
            	for (var k = 0; k < data.location.length; k++) {
            		state += data.location[k].facility.address.state + ',';
            	}
            }
            */



            if (!data.hasOwnProperty("detailed_description"))
                detailed_description = "N/A";
            else
                detailed_description = data.detailed_description.textblock;

            if (!data.hasOwnProperty("last_update_submitted"))
                last_update_submitted = "N/A";
            else
                last_update_submitted = data.last_update_submitted;

            if (!data.hasOwnProperty("overall_contact")) {
                last_name = "N/A";
                phone = "N/A";
                email = "N/A";
            } else {
                last_name = data.overall_contact.last_name;
                phone = data.overall_contact.phone;
                email = data.overall_contact.email;
            }

            console.log(position);
            var obj = [{
                nct_id: nct_id,
                url: url,
                brief_title: brief_title,
                official_title: official_title,
                country: country,
                //state: state,
                detailed_description: detailed_description,
                last_update_submitted: last_update_submitted,
                last_name: last_name,
                phone: phone,
                email: email,
                position: position,

                //longitude - latitude
                Spots: ArrayData
            }];
            console.log(obj);

            oModel.setData({
                modelData1: obj
            });
            oController.onNavButtonTo(oEvent, "fd:18");
        }

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var z = 0; z < 1e7; z++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }


        function handleOnPress(oEvent) {
            var data = {};
            data.context = oEvent.getSource().getBindingContext();
            var selectedIndex = data.context.sPath.split("/")[4];

            var nct_id = data.context.oModel.oData.modelData[0].results[selectedIndex].nct_id;
            wasteTime();

            //** Offline mode **
            /*
			 oModel = new sap.ui.model.json.JSONModel();
			 var obj = [{ 
				nct_id: '123', 
				url: 'http://www.google.com',
				brief_title: 'title', 
				official_title: 'official_title',
				country: 'country',
				detailed_description: 'detailed_description.textblock',
				last_update_submitted: 'last_update_submitted',
				last_name: 'overall_contact.last_name',
				phone: 'overall_contact.phone',
				email: 'overall_contact.email'
			}];

			//console.log(JSON.parse(data1));
			var myJSON = JSON.stringify(obj);

			oModel.setData({
				modelData1 : JSON.parse(myJSON)
			});
			oController.onNavButtonTo(oEvent,  "fd:18");
			*/
            //** Offline mode **


            //** Online mode **
            var ArrayData = [];
            var position = '';

            oModel = new sap.ui.model.json.JSONModel();
            $.ajax({
                type: 'GET',
                async: true,
                cache: true,
                url: "/nodejs?q=2&nctid=" + nct_id,
                //url: "http://10.44.136.115/nodejs?q=2&nctid=" + nct_id,

                success: function(data) {
                    if (data.length > 0) {
                        runNext();
                        data = JSON.parse(data);
                        console.log(data);

                        var innerFunction = function(j, geoAddress, city, state, process) {
                            // Your work to be done is here...

                            if (geoAddress == "Korea, Republic of") geoAddress = "South Korea";


                            if (city.indexOf('-city') >= 0) {
                                city = city.substring(0, city.length - 5);
                            }
                            if (city.indexOf('-ku') >= 0) {
                                city = city.substring(0, city.length - 3);
                            }

                            console.log('state:' + state);
                            if (typeof state !== 'undefined') {
                                if (state == "BGR")
                                    state = "Bulgaria";
                                if (state.indexOf('Republic') >= 0) {
                                    state = state.substring(0, state.length - 8);
                                }
                            } else
                                state = '';

                            if (city == state)
                                state = '';

                            //geoAddress = city + ' ' + state + ', ' + geoAddress;

                            getLatitudeLongitude(geoAddress, function(result) {
                                if (result != 'no data') {

                                    //if using offline map
                                    //var obj = eval('(' + result + ')');
                                    //result = JSON.parse(JSON.stringify(obj));

                                    //if using non-offline map
                                    result = JSON.parse(JSON.stringify(result));

                                    lat = result.lat;
                                    lng = result.lng;
                                    position = "" + lng + ";" + lat + ";0";

                                    console.log(position);

                                    ArrayData.push({
                                        key: "" + j + "",
                                        pos: lng + ';' + lat + ';0',
                                        tooltip: geoAddress,
                                        type: sap.ui.vbm.SemanticType.Success,
                                        select: true
                                    });
                                }
                                process.done();
                            });
                        };

                        var outerFunction = function(cb) {

                            if (data.hasOwnProperty("location")) {
                                var lengthdata = 1;
                                if (typeof data.location.length === 'undefined')
                                    lengthdata = 1;
                                else
                                    lengthdata = data.location.length;

                                if (lengthdata > 0) {
                                    // Process object for tracking state of innerFunction executions
                                    var process = {
                                        // Total number of work ahead (number of innerFunction calls required).
                                        count: lengthdata,
                                        // Method which is triggered when some call of innerFunction finishes  
                                        done: function() {
                                            // Decrease work pool
                                            this.count--;
                                            // Check if we are done & trigger a callback
                                            if (this.count === 0) {
                                                setTimeout(cb, 0);
                                            }
                                        }
                                    };

                                    var f = 1;
                                    wasteTime();
                                    console.log(lengthdata);

                                    for (var j = 0; j < lengthdata; j++) {
                                        if (lengthdata == 1)
                                            innerFunction(f, data.location.facility.address.country, data.location.facility.address.city, data.location.facility.address.state, process);
                                        else {
                                            innerFunction(f, data.location[j].facility.address.country, data.location[j].facility.address.city, data.location[j].facility.address.state, process);
                                        }
                                        f = f + 1;
                                    }
                                }
                            } else {
                                runNext();
                                console.log(ArrayData);
                                FD(oEvent, nct_id, ArrayData, data, oController, position);
                            }

                        };

                        outerFunction(function() {
                            //All done for outerFunction! - What you should do next?
                            runNext();
                            console.log(data);
                            FD(oEvent, nct_id, ArrayData, data, oController, position);
                        });

                    } else {
                        jQuery.sap.require("sap.m.MessageBox");
                        sap.m.MessageBox.show(jQuery.sap.resources({
                            url: "i18n/i18n.properties"
                        }).getText("NO_INFO"), {
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
                    if (errorThrown == '')
                        errorThrown = 'Cannot connect to the backend';
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
        }

        function createListFromModel(oListContainer, modelPath, id) {
            if (oListContainer.hasModel() == false) {
                console.log(oListContainer + " Error");
                return;
            }
            oList.setModel(oModel);

            var oModelPath = new sap.ui.model.json.JSONModel(oModel);
            sap.ui.getCore().setModel(oModelPath, "pathmodel");

            oListContainer.bindAggregation("items", "/modelData/0/results", oListTemplate);
        }

		
        this.addEventDelegate({
            onBeforeShow: function(evt) {
                createListFromModel(oList, "/modelData/0/results", evt.data.context);
                //console.log(oModel.oData.modelData[0].length);
                               
				console.log(oModel);
				//oSpotsCollection.setModel(oModel);
				oVBI.setModel(oModel);

				if(oModel.oData.modelData[0].Spots.hasOwnProperty('0')) {
				    oVBI.setCenterPosition(oModel.oData.modelData[0].Spots[0].pos);
                }
				
				//this.setModel(sap.ui.getCore().getModel('oSpotsModel'));
            }
        }, this);

        var oPage = new sap.m.Page({
            showNavButton: true,
            enableScrolling: true,
            navButtonPress: [oController.doNavBack, oController],
            customHeader: new sap.m.Bar({
                contentLeft: [new sap.m.Button("BackButtonD", {
                    icon: "sap-icon://nav-back",
                    text: "Back",
                    tap: function() {
                        oController.doNavBack();
                    }
                })],
                contentMiddle: [new sap.m.Label("titleD", {
                    text: "Clinical Trials",
                    design: "Bold"
                })]
            })
        });

       
        
		//oSpotsCollection.setModel(sap.ui.getCore().getModel('oSpotsModelFD'));
        oVBI.setMapConfiguration(oMapConfig);
		//oVBI.setCenterPosition('0;0');
		oVBI.setZoomlevel(2);
		oVBI.setWidth('100%');
		oVBI.setHeight('40%');
		//oVBI.addVo(oSpotsCollection);

        oPage.addContent(oVBI);
        oPage.addContent(sf);
        oPage.addContent(oList);
        app.addPage(oPage);
        return app;
    }
});