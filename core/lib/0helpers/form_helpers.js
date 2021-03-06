FormHelpers = {
	clearAllFormStates:function(session){
		session.set(Show_Model_Form,false);
    	session.set(Editing_Model,false);
    	session.set(Add_Model,false);
        session.set(Editing_ModelDefId,null);
	},
	clearFormSate:function(session,property,value){
		value = value || null;
		session.set(property,value);
	},

	populateDerivedFieldData:function(field,form){
		var derivedPropertyNames = Derived_Property_Field_Names;
		ArrayUtils.each(derivedPropertyNames,function(propertyName){
            FormHelpers.populateFieldsFormProperty(form,field,propertyName);
		});
	},

	searchAction:function(evt,template){
		var fields = ModelDefHelpers.getCurrentModelFields();

		var data = ArrayUtils.reduce(fields,function(inputData,field){
			var searchFieldValue = ComponentHelpers.getComponentValueBySelector(template,"input[id^=search_" + field.name+  "]");
			if(searchFieldValue) {
				searchFieldValue = StringUtils.escapeSpecialCharacters(searchFieldValue);
				inputData[field.name] = {$regex: ".*" + searchFieldValue + ".*", $options: "i"};
			}
			return inputData;
		},{});
		//console.log("search data : " , data);
		Session.set(Search_Data,data);
	},

	setFormGetValueFunction:function(){
		var templateInstance = this;
		this.childComponents = [];

		this.getValue = function(){
			return ArrayUtils.reduce(templateInstance.childComponents,function(formData,childComponent){
				formData[childComponent.getName()] = childComponent.getValue();
				return formData;
			},{});
		}
	},

	// this function is assigned to created function of template instance to store reference
	// of this template instance to parent form
	setParentForm:function(){
		//TODO:confirm this will work
		// here this should refer to template instance
		var templateInstance = this;

		templateInstance.getName = function(){
			return templateInstance.data.name;
		};

		//debugger;
		var form = TemplateHelpers.getParentFormTemplate(templateInstance);
		form.childComponents.push(templateInstance);
	},

	getFormMode:function(){
		return RouterHelpers.getParamValue(Form_Mode);
	},

	isEditingForm:function(){
		return FormHelpers.getFormMode() === Form_Mode_Edit;
	}
};