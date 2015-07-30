Template.model_instance_form_buttons.helpers({
    // this is used to show either save or update button
    editingModel : function() {
        return Session.get(Editing_Model);
    }
});

Template.button_form_cancel.events({
    'click':function(evt,template){
        var currentModel = ModelHelpers.currentModel();
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(currentModel._id);
        return false;
    }
});