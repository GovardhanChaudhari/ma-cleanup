Template.button_edit_model_phone.events({
    "click":function(evt,template){
        console.log("clicked edit");
        var currentModel = ModelHelpers.currentModel();
        var modelInstance = TemplateHelpers.getParentViewData(template.view,"model_instance_details_phone");
        Session.set(Editing_Model, modelInstance._id);
        Session.set(Current_Editing_Model_Data, modelInstance);
        //debugger;
        RouterHelpers.mobileShowEditModelInstanceForm(currentModel._id);
    }
});