Template.model_instance_form_body.helpers({
    fields: function(){
        debugger;
        var fields = ModelHelpers.getCurrentModelFields();
        //fields = ArrayUtils.removeElementByPropertyNameAndValue(fields,"_id");
        return fields;
    }
});