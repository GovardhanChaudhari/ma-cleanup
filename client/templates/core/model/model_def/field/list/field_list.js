Template.button_delete_field_row.events({
	'click':function(evt,template){
		evt.preventDefault();
		//debugger;
		if(confirm("Are you sure ?") == true){
			var modelDef = ModelDefHelpers.getEditingModelDef();
			var modelDefId = modelDef._id;
			//TODO remove key should return cloned object
			modelDef = ObjectUtils.removeKey(modelDef,"_id");
			modelDef.fields = ArrayUtils.removeElementByIndex(modelDef.fields,template.data.rowIndex);
			DBUtils.update(ModelDefDb,modelDefId,modelDef);
		}
	}
});

Template.button_edit_field_row.helpers({
	modelId:function(){
		var modelInstance = TemplateHelpers.getParentViewData(Blaze.currentView,"model_def_form");
		return modelInstance._id;
	}
});

Template.field_def_table_row.helpers({
	fieldNames:function(){
		var model = TemplateHelpers.getParentViewData(Blaze.currentView,"model_def_form");
		return FieldHelpers.getFieldNameObjectArrayByFieldArray(model.fields);
	},

	index:function(){
		console.log("field index : ", this.index);
		return  this.index;
	}
	/*rowIndex:function(){
		return Template.instance().index;
	}*/
});

Template.field_def_table_cell_value.helpers({
	value:function(){
		var field = TemplateHelpers.getParentViewData(Blaze.currentView,"field_def_table_row");
		var val = field[this.name];
		//console.log("field value : " + val);
		return val;
	}
});


Template.button_edit_field_row.events({
	'click':function(evt,template){
		//debugger;
		EventUtils.stopDefault(evt);
		Session.set(Editing_Field,template.data.rowIndex);
		var modelInstance = TemplateHelpers.getParentViewData(Blaze.currentView,"model_def_form");
		RouterHelpers.showEditModelDefFieldForm(modelInstance._id,template.data.rowIndex);
	}
});
