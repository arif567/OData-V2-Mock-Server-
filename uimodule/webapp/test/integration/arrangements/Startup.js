sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("sap.ui.demo.mockserver.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "sap.ui.demo.mockserver",
                    async: true,
                    manifest: true,
                },
            });
        },
    });
});
