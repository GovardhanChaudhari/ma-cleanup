Template.array_table_button_edit_row.events({
    "click":function(evt,template){
        EventUtils.stopDefault(evt);
        //Session.set(Editing_Field,template.data.rowIndex);
        var rowData = TemplateHelpers.getParentViewData(Blaze.currentView,"array_table_row");
        //Session.set(Editing_Field,template.data.rowIndex);

    }
});