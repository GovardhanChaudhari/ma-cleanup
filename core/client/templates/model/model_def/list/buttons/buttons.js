Template.button_add_model_def.events({
    'click':function(evt,template){
        Session.set(Editing_ModelDefId,null);
        Session.set(Add_Model,true);
        RouterHelpers.showNewModelDefForm(RouterHelpers.getCurrentProcessingModelId());
    }
});

Template.button_edit_model_def_row.events({
    'click':function(evt,template){
        debugger;
        console.log("editing model def id :" + template.data._id);
        Session.set(Editing_ModelDefId,template.data._id);
        Session.set(Editing_Model,true);
        RouterHelpers.showEditModelDefForm(template.data._id);
        return false;
    }
});