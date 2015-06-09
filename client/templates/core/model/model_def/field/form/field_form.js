Template.field_form.rendered = function(){
    var template = this;

    this.getValue = function(){
        var name = ComponentHelpers.getInputValueByName(template,"name");
        var label = ComponentHelpers.getInputValueByName(template,"label");
		var type = ComponentHelpers.getDataListValue(template,"type");
        var operation = ComponentHelpers.getInputValueByName(template,Table_Operation);

		if(!label){
			label = name;
		}

        var formData ={name:name,type:type,label:label};
        if(operation){
            formData[Table_Operation] = operation;
        }
        if(type === Data_Type_Combo || type === Data_Type_DropDown){
            var comboExtraParamValue = ComponentHelpers.getComboExtraParamValues(template);
            //debugger;
            formData = ObjectUtils.merge(formData,comboExtraParamValue);
        }else if(type === Data_Type_Derived){

        }

		// note that this value is of type string ie "true" or "false"
		var hasEffectOnOtherModel = ComponentHelpers.getCheckBoxComponentValue(template,"has_effect");

		if(ObjectUtils.stringToBoolean(hasEffectOnOtherModel)){
			var affectFieldData = Field_Form_Helpers.getAffectFieldData(template);
			formData = ObjectUtils.merge(formData,affectFieldData);
			formData["has_effect"] = "true";
		}else{
			formData = ObjectUtils.removeKeys(formData,Affect_Field_Names);
		}

        return formData;
    };
};

Template.field_form.helpers({
	isCombo:function(){
		console.log("checking is combo");
		if(this.type === Data_Type_Combo || this.type === Data_Type_DropDown){
			Template.instance().isCombo.set(true);
		}	
		return Template.instance().isCombo.get();	
	},

	isEditing:function(){
		return (Session.get(Editing_Field) !== null && Session.get(Editing_Field) !== undefined);
	}
});


Template.button_cancel_field_form.events({
	'click':function(evt,template){
		evt.preventDefault();
		Session.set(Editing_Field,null);
		RouterHelpers.goEditModelDefs(ModelDefHelpers.getEditingModelDef()._id);
	}
});

Template.button_save_field_form.events({
	'click':function(evt,template){
		evt.preventDefault();
		//debugger;
		var field_form = TemplateHelpers.getParentTemplate(template,"field_form");
		var modelDef = ModelDefHelpers.getModelDefById(this.modelId);
		var fieldData = field_form.getValue();
		//TODO remove key should return cloned object
		var modelDef = ObjectUtils.removeKey(modelDef,"_id");
		modelDef.fields.push(fieldData);
		DBUtils.update(ModelDefDb,this.modelId,modelDef);
		Session.set(Editing_Field,null);
		RouterHelpers.goEditModelDefs(this.modelId);
	}
});


Template.button_update_field_form.events({
	'click':function(evt,template){
		evt.preventDefault();
		//debugger;
		var modelDefId = ModelDefHelpers.getEditingModelDef()._id;
		var field_form = TemplateHelpers.getParentTemplate(template,"field_form");
		var modelDef = ModelDefHelpers.getModelDefById(modelDefId);
		var fieldData = field_form.getValue();
		//TODO remove key should return cloned object
        //debugger;
		var modelDef = ObjectUtils.removeKey(modelDef,"_id");
		var fieldIndex = Session.get(Editing_Field);

		var oldFieldData = modelDef.fields[fieldIndex];

		debugger;
		modelDef.fields[fieldIndex] = fieldData;
		DBUtils.update(ModelDefDb,modelDefId,modelDef);

		// only update if name is changed
		if(oldFieldData.name !== fieldData.name){
			var model = ModelHelpers.getModel(modelDef.name);
			ModelHelpers.renameModelProperty(model,oldFieldData.name,fieldData.name);
		}

		Session.set(Editing_Field,null);
		RouterHelpers.goEditModelDefs(modelDefId);
	}
});

Template.field_form.created = function(){
	this.isCombo = new ReactiveVar(false);
	TemplateHelpers.setAppFormGetValueFunction.apply(this);
};

Template.combo_fields.helpers({
	isMultiple:function(){
        //debugger;
        var field_form = TemplateHelpers.getParentTemplate(Template.instance(),"field_form");
        return field_form .isCombo.get();
	}
});