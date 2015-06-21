Template.button_add_model_phone.events({
    'click':function(evt,template){
        Session.set(Editing_Model,false);
        Session.set(Add_Model,true);
        EventUtils.stopDefault(evt);
        var currentModel = ModelHelpers.currentModel();
        console.log("this is phone");
        RouterHelpers.mobileShowNewModelInstanceForm(currentModel._id);
    }
});