sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/ObjectListItem",
        "sap/m/ObjectAttribute"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ObjectListItem, ObjectAttribute) {
        "use strict";

        return Controller.extend("sap.ui.demo.mockserver.controller.MainView", {
           
            onPress: function() {
                var oList = this.byId("idList");
                oList.bindItems({
                    path: "/Meetups",
                    parameters: {
                        custom: {
                            first: "3"
                        }
                    },
                    template: new ObjectListItem({
                        title: "{Title}",
                        number: {
                            path: 'EventDate',
                            type: 'sap.ui.model.type.DateTime',
                            formatOptions: {
                                style: 'medium'
                            }
                        },
                        attributes: [
                            new ObjectAttribute({
                                text: "{Description}"
                            })
                        ]
                    })
                });
            }
        });
    
    });