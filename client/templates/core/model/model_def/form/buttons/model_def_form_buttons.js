Template.button_cancel_model_def_form.events({
    'click':function(evt,template){
        Session.set(Editing_ModelDefId,null);
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(RouterHelpers.getCurrentProcessingModelId());
        return false;
    }
});

Template.button_save_model_def_form.events({
    'click':function(evt,template){
        //debugger;
        var modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
        var data = modelFormTemplate.getValue();
        //debugger;
        // Here we are saving the new model definition instance

        // the fields array of model definition instance contains two keys
        // one is 'name' of model definition which is of symple type
        // second is 'fields' which is of array type containing multiple objects eg {name:"",type:""}

        var modelId = DBUtils.insert(ModelDefDb,data);
        ModelHelpers.publishAndSubscribeModel(data.name);
        FormHelpers.clearAllFormStates(Session);
        var currentModelId = RouterHelpers.getCurrentProcessingModelId();
        RouterHelpers.showModelList(currentModelId);
    }
});

Template.button_update_model_def_form.events({
    'click':function(evt,template){
        var modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
        var editingModelDefId = RouterHelpers.getCurrentProcessingModelId();

        var data = modelFormTemplate.getValue();
        //debugger;
        // Here we are updating the new model definition instance
        var modelId = DBUtils.update(ModelDefDb,editingModelDefId,data);
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(editingModelDefId);
        return false;
    }
});

Template.button_add_new_field.events({
    'click':function(evt,template){
        RouterHelpers.showNewModelDefFieldForm(RouterHelpers.getCurrentProcessingModelId());
    }
});