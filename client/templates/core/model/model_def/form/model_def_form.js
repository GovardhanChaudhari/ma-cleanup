//Template.model_def_form.created = FormHelpers.setFormGetValueFunction;

/*Template.model_def_form.rendered = function(){
    var template = this;

    this.getValue = function(){
        var data={};
        ArrayUtils.each(template.childComponents,function(childComponent){
            data[childComponent.getName()] = childComponent.getValue();
        });

        var editingModelDef = ModelDefHelpers.getEditingModelDef();

        if(editingModelDef){
            // get form data while editing
            //var modelDef = ModelDefHelpers.getModelDefById(editingModelDef._id);
            data.fields = editingModelDef.fields;
        }else{
            // adding new model def
            data.fields = [];
        }
        return data;
    };
};*/

Template.model_def_form.helpers({

	fields:function(){
		//var fields = ModelHelpers.getEditingModelSubFields(this._id);
        debugger;
        var fields = TemplateHelpers.getParentFormData(Template.instance()).fields;
		//console.log("found fields : " + fields.length);
		// add index to each field
		return ArrayUtils.map(fields,function(field,index){
			field.index = index;
			return field;
		});
	},

	fieldNames:function(){
		//return FieldNames;
		return FieldHelpers.getFieldNameObjectArrayByFieldArray(this.fields);
	},

	isEditing:function(){
		//debugger;
		return Session.get(Editing_ModelDefId) !== null && Session.get(Editing_ModelDefId) !== undefined;
	},

    currentModelDefName: function () {
        console.log("getting current model name ", this.name);
        return this.name;
    }

});


Template.button_add_new_field.helpers({
	modelId:function(){
		var modelInstance = TemplateHelpers.getParentViewData(Blaze.currentView,"model_def_form");
        if(modelInstance){
            // editing model def
        }else{
            // creating new model def
        }
		return modelInstance._id;
	}
});
