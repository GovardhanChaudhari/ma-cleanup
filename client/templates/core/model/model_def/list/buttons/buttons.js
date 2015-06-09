Template.button_add_model_def.events({
    'click':function(evt,template){
        Session.set(Editing_ModelDefId,null);
        Session.set(Add_Model,true);
        var currentModel = ModelHelpers.currentModel();
        RouterHelpers.showNewModelDefForm(currentModel._id);
    }
});

Template.button_edit_model_def_row.events({
    'click':function(evt,template){
        EventUtils.stopDefault(evt);
        //debugger;
        console.log("editing model def id :" + template.data._id);
        Session.set(Editing_ModelDefId,template.data._id);
        Session.set(Editing_Model,true);
        RouterHelpers.showEditModelDefForm(template.data._id);
    }
});