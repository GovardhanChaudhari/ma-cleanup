Template.button_export.events({
    'click':function(evt,template){
        //console.log("exporting to csv ...");
        var model = ModelHelpers.currentModel();
        ClientHelpers.exportModel(model);
    }
});