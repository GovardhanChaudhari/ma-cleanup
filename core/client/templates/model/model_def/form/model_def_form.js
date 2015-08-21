var formSaveAction = function(template){
	//debugger;
	var modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
	var data = modelFormTemplate.getValue();
	//debugger;
	// Here we are saving the new model definition instance

	// the fields array of model definition instance contains two keys
	// one is 'name' of model definition which is of symple type
	// second is 'fields' which is of array type containing multiple objects eg {name:"",type:""}

	var modelId = DBUtils.insert(ModelDefDb,data);
	ModelHelpers.publishAndSubscribeModel(data.name);
	//FormHelpers.clearAllFormStates(Session);
	//var currentModelId = RouterHelpers.getCurrentProcessingModelId();
	//RouterHelpers.showModelList(currentModelId);
};

var formUpdateAction = function(template){
	var modelFormTemplate = TemplateHelpers.getParentFormTemplate(template);
	var editingModelDefId = RouterHelpers.getCurrentProcessingModelId();

	var data = modelFormTemplate.getValue();
	debugger;
	// Here we are updating the new model definition instance
	var modelId = DBUtils.update(ModelDefDb,editingModelDefId,data);
	//FormHelpers.clearAllFormStates(Session);
	//RouterHelpers.showModelList(editingModelDefId);
	//return false;
};

Template.model_def_form.events({
	"submit form":function(evt,template){
		debugger;
		console.log("form submit event called for model def");

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
				//TODO
				MobileRouteHelpers.showModelInstanceList(currentModelId);
			}

		}else{
			RouterHelpers.showModelList(currentModelId);
		}
		//prevent default action
		return false;
	}
});

Template.model_def_form.helpers({

	fields:function(){
        //debugger;
        var fields = TemplateHelpers.getParentFormData(Template.instance()).fields;
		// add index to each field
		return ArrayUtils.map(fields,function(field,index){
			field.index = index;
			return field;
		});
	},

	fieldNames:function(){
		return FieldHelpers.getFieldNameObjectArrayByFieldArray(this.fields);
	},

	isEditing:function(){
		//debugger;
		return Session.get(Editing_ModelDefId) !== null && Session.get(Editing_ModelDefId) !== undefined;
	},

    currentModelDefName: function () {
        //console.log("getting current model name ", this.name);
        return this.name;
    }

});