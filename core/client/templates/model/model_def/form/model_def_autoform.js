Template.model_def_autoform.helpers({

	fields:function(){
        //debugger;
        var fields = TemplateHelpers.getParentFormData(Template.instance())[MDF_AutoFormFields];
		// add index to each field
		return ArrayUtils.map(fields,function(field,index){
			field.index = index;
			return field;
		});
	},

	fieldNames:function(){
		return FieldHelpers.getFieldNameObjectArrayByFieldArray(this[MDF_AutoFormFields]);
	},

	isEditing:function(){
		//debugger;
		return Session.get(Editing_ModelDefId) !== null && Session.get(Editing_ModelDefId) !== undefined;
	},

    currentModelDefName: function () {
        //console.log("getting current model name ", this.name);
        return this[MDF_Name];
    }

});