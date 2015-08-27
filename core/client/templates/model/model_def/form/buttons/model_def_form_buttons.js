Template.button_cancel_model_def_form.events({
    'click':function(evt,template){
        Session.set(Editing_ModelDefId,null);
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList();
        return false;
    }
});

Template.button_add_new_field.events({
    'click':function(evt,template){
        debugger;
        RouterHelpers.showNewModelDefFieldForm(RouterHelpers.getCurrentModelDefId());
        return false;
    }
});