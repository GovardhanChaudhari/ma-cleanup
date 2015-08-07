var formSaveAction = function(template){

    //modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_instance_form");
    modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
    var data = modelFormTemplate.getValue();

    var currentModel = ModelHelpers.currentModel();
    if(currentModel.name === ModelDb_Name){
        // Here we are saving the new model definition instance

        // the fields array of model definition instance contains two keys
        // one is 'name' of model definition which is of symple type
        // second is 'fields' which is of array type containing multiple objects eg {name:"",type:""}

        var modelId = ModelDefDb.insert(ModelDefDb.create(data,{ownerId:Meteor.userId()}));
        ModelHelpers.publishAndSubscribeModel(data.name);
    }else{
        //TODO
        //debugger;
        currentModel.create(data);

        var affectedModelField = ModelDefHelpers.getAffectedModelField(currentModel);

        if(ObjectUtils.stringToBoolean(affectedModelField.has_effect)){
            var model = ModelHelpers.getModel(affectedModelField[Affect_Model_Name]);
            var modelProperty = affectedModelField[Affect_Model_Property];
            var filterProperty = affectedModelField[Affect_Filter_Property];
            var operation = affectedModelField[Affect_Operation];

            //var searchData = {};
            //var value = data[filterProperty];
            //searchData[filterProperty] = {$regex: ".*" + value + ".*",$options:"i"};

            //var filteredModels = currentModel.getModelList(searchData);

            // TODO assuming operation is add
            //var sum =  ArrayUtils.sum(filteredModels,modelProperty,affectedModelField["type"]);

            var destSearchData = {};
            destSearchData[filterProperty] = data[filterProperty];
            var modelInstance =  model.findOne(destSearchData);
            if(modelInstance){
                if(operation === "add"){
                    modelInstance[modelProperty] = parseInt(modelInstance[modelProperty]) + parseInt(data[modelProperty]);
                }else if(operation === "remove"){
                    modelInstance[modelProperty] = parseInt(modelInstance[modelProperty]) - parseInt(data[modelProperty]);
                }else{
                    console.log("Error: invalid affect operation: ", operation, "currently only support 'add' and 'remove'");
                }

                //TODO if modelInstance is not found add new one
                DBUtils.update(model,modelInstance._id,modelInstance);
            }
        }
    }
};

var formUpdateAction = function(template){
    //modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_instance_form");
    modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
    //debugger;
    var data = modelFormTemplate.getValue();

    var currentModel = ModelHelpers.currentModel();
    if(currentModel.name === UserDef.name){
        UserDb.updateUser(Session.get(Editing_Model),data);
    }else{
        currentModel.update(Session.get(Editing_Model), {$set:data});
    }
};

Template.model_instance_form_body.helpers({
    fields: function(){
        debugger;
        var fields = ModelHelpers.getCurrentModelFields();
        //fields = ArrayUtils.removeElementByPropertyNameAndValue(fields,"_id");
        return fields;
    }
});

Template.model_instance_form_body.rendered = function(){
    $('#model_instance_form_body').parsley({trigger: 'change'});
};


Template.model_instance_form_body.events({
   "submit form": function (evt, template) {
       console.log("form submit event called");

       if(FormHelpers.isEditingForm()){
           formUpdateAction(template);
       }else{
           formSaveAction(template);
       }

       var currentModelId = ModelDefHelpers.getCurrentModelDefId();
       FormHelpers.clearAllFormStates(Session);
       if(MobileUtils.isPhoneOrTablet()){
           if(FormHelpers.isEditingForm()){
               var editingModelInstance = ModelHelpers.getCurrentEditingModelData();
               MobileRouteHelpers.showModelDetails(currentModelId,editingModelInstance._id);
           }else{
               MobileRouteHelpers.showModelInstanceList(currentModelId);
           }

       }else{
           RouterHelpers.showModelList(currentModel._id);
       }
       //prevent default action
       return false;
   }
});