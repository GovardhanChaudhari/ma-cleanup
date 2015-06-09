Template.model_instance_form_header.helpers({
    // this is used to show either save or update button
    editingModel : function() {
        return Session.get(Editing_Model);
    }
});