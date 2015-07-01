Template.button_cancel_model_def_form.events({
    'click':function(evt,template){
        evt.preventDefault();
        Session.set(Editing_ModelDefId,null);
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(ModelHelpers.currentModel()._id);
    }
});

Template.button_save_model_def_form.events({
    'click':function(evt,template){
        debugger;
        var modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_def_form");
        var currentModel = ModelHelpers.currentModel();
        var data = modelFormTemplate.getValue();
        //debugger;
        // Here we are saving the new model definition instance

        // the fields array of model definition instance contains two keys
        // one is 'name' of model definition which is of symple type
        // second is 'fields' which is of array type containing multiple objects eg {name:"",type:""}

        var modelId = DBUtils.insert(ModelDefDb,data);
        ModelHelpers.publishAndSubscribeModel(data.name);
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(currentModel._id);
    }
});

Template.button_update_model_def_form.events({
    'click':function(evt,template){
        evt.preventDefault();

        var modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_def_form");
        var editingModelDefId = TemplateHelpers.getParentViewData(template.view,"model_def_form")._id;

        var data = modelFormTemplate.getValue();
        //debugger;
        // Here we are updating the new model definition instance
        var modelId = DBUtils.update(ModelDefDb,editingModelDefId,data);
        FormHelpers.clearAllFormStates(Session);
        var currentModel = ModelHelpers.currentModel();
        RouterHelpers.showModelList(currentModel._id);
    }
});

Template.button_add_new_field.events({
    'click':function(evt,template){
        RouterHelpers.showNewModelDefFieldForm(RouterHelpers.getParamValue("_id"));
    }
});