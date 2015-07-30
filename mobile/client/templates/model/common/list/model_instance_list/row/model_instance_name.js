Template.model_instance_name_phone.events({
    'click':function(evt,template){
        console.log("list details item clicked ",template.data.name);
        //Session.set(Current_Model_Id,template.data._id);
        var modelDefId = Session.get(Current_Model_Id);
        RouterHelpers.mobileShowModelDetails(modelDefId,template.data._id);
    }
});


Template.model_instance_name_phone.helpers({
    name:function(){
        if(this["name"]){
            return this.name;
        }else{
            return this[ModelHelpers.currentModel()[MDF_SummaryPropertyName]];
        }
    }
});