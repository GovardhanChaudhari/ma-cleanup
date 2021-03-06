Template.field_form_buttons.helpers({
	isEditing:function(){
		return (Session.get(Editing_Field) !== null && Session.get(Editing_Field) !== undefined);
	}
});


Template.button_cancel_field_form.events({
	'click':function(evt,template){
		evt.preventDefault();
		Session.set(Editing_Field,null);
		RouterHelpers.showEditModelDefForm(ModelDefHelpers.getEditingModelDef()._id);
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
		RouterHelpers.showEditModelDefForm(this.modelId);
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
        debugger;
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
		RouterHelpers.showEditModelDefForm(modelDefId);
	}
});
