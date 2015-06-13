Template.model_instance_form_buttons.helpers({
    // this is used to show either save or update button
    editingModel : function() {
        return Session.get(Editing_Model);
    }
});

Template.button_form_cancel.events({
    'click':function(evt,template){
        evt.preventDefault();
        var currentModel = ModelHelpers.currentModel();
        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(currentModel._id);
    }
});

Template.button_form_update.events({
    'click':function(evt,template){
        evt.preventDefault();
        modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_instance_form");
        //debugger;
        var data = modelFormTemplate.getValue();

        var currentModel = ModelHelpers.currentModel();
        if(currentModel.name === UserDef.name){
            UserDb.updateUser(Session.get(Editing_Model),data);
        }else{
            currentModel.update(Session.get(Editing_Model), {$set:data});
        }

        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(currentModel._id);
    }
});

Template.button_form_save.events({
    'click':function(evt,template){
        //debugger;
        evt.preventDefault();
        // here template var is instance of button_save template, but we actually want the model_form
        // template instance which is parent template of this template

        modelFormTemplate = TemplateHelpers.getParentTemplate(template,"model_instance_form");
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
            debugger;
            currentModel.create(data);

            //var modelDef = ModelDefHelpers.getModelDefByName(currentModel);
            var affectedModelField = ModelDefHelpers.getAffectedModelField(currentModel);

            if(affectedModelField){
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

        FormHelpers.clearAllFormStates(Session);
        RouterHelpers.showModelList(currentModel._id);
    }
});