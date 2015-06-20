Template.button_export_csv.events({
    'click':function(evt,template){
        //console.log("exporting to csv ...");
        ExportUtils.exportModelToCSV(ModelHelpers.getCurrentModelName());
    }
});

Template.button_export_json.events({
    'click':function(evt,template){
        ExportUtils.exportModelToJSON(ModelHelpers.getCurrentModelName());
    }
});