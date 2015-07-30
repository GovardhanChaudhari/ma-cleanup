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