Template.array_table_button_edit_row.events({
    "click":function(evt,template){
        EventUtils.stopDefault(evt);
        var rowData = TemplateHelpers.getParentViewData(Blaze.currentView,"array_table_row");
        Session.set(Editing_Field,rowData.index);
        var modelDefId = ModelDefHelpers.getEditingModelDefId();
        RouterHelpers.showEditModelDefFieldForm(modelDefId,rowData.index);
    }
});

Template.array_table_button_delete_row.events({
    "click":function(evt,template){
        EventUtils.stopDefault(evt);
        var modelDef = ModelDefHelpers.getEditingModelDef();
        var modelDefId = modelDef._id;
        if(confirm("Are you sure ?") == true){
            var rowData = TemplateHelpers.getParentViewData(Blaze.currentView,"array_table_row");
            //TODO remove key should return cloned object
            modelDef = ObjectUtils.removeKey(modelDef,"_id");
            modelDef.fields = ArrayUtils.removeElementByIndex(modelDef.fields,rowData.index);
            //TODO update operation of model name specified in array table 'model_name' attribute
            DBUtils.update(ModelDefDb,modelDefId,modelDef);
            var arrayTableTemplate = TemplateHelpers.getParentTemplate(template,"array_table");
            var rows = arrayTableTemplate.rows.get();
            rows = ArrayUtils.removeElementByPropertyNameAndValue(rows,"index",rowData.index);
            arrayTableTemplate.rows.set(rows);
        }
        RouterHelpers.showEditModelDefForm(modelDefId);
    }
});