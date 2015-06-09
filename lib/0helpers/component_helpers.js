ComponentHelpers = {

    isCheckBoxChecked:function(component){
        var value = $(component).is(":checked") ? "true" : "false";
        return value;
    },

	getComponentValue:function(template,name){
		//debugger;
		var val = ComponentHelpers.getComponentValueByIdAttribute(template,name);
		if(val){
		}else{
			val = ComponentHelpers.getComponentValueByNameAttribute(template,name);
		}
		return val;
	},

	getComponent:function(template,value){
		//debugger;
		var val = ComponentHelpers.getComponentByAttribute(template,"id",value);
		if(val){
		}else{
			val = ComponentHelpers.getComponentByAttribute(template,"name",value);
		}
		return val;
	},

	getCheckBoxComponent:function(template,fieldName){
		//return ComponentHelpers.getComponentByName(template,"checkbox");
		var component = ComponentHelpers.getInputByName(template,fieldName);
		return component;
	},

	getCheckBoxComponentValue:function(template,fieldName){
		console.log("checkbox compoent value accessed");
		return ComponentHelpers.isCheckBoxChecked(ComponentHelpers.getCheckBoxComponent(template,fieldName));
	},
	// convert string to boolean
	getCheckBoxValue:function(value){
		return ObjectUtils.stringToBoolean(value);
	},

	getFieldNameValue:function(template){
		return $(template.find("input[id^='model_field_name']")).val();
	},

	getFieldTypeSelectBox:function(template){
		var selectBox = template.find('select[id^="model_field_type"]');
		return selectBox;
	},

	getFieldArrayTypeValue:function(template){
		var selectBox = template.find('select[id^="model_field_array_type"]');
		return $(selectBox).val();
	},

	getComboFieldValue:function(template,fieldName){
		return ComponentHelpers.getComponentValueBySelector(template,"input[id='fields[" + fieldName + "]']");
	},

	getFieldTypeSelectBoxValue:function(template){
		var value;
		// assuming template has only one select box
		value = $(ComponentHelpers.getFieldTypeSelectBox(template)).val();
		return value;
	},

	getFieldOperationValue:function(template){
		var val = ComponentHelpers.getDataListValue(template,"model_field_operation");
		return val;
	},

	getDropDown:function(template,fieldName){
		var selectBox = template.find("select[id='"+fieldName+"']");
		return selectBox;
	},

	getDropDownValue:function(template,fieldName){
		//debugger;
		var selectBox = ComponentHelpers.getDropDown(template,fieldName);
		return $(selectBox).val();
	},

	getComboExtraParamValues:function(template){
		console.log("combo extra parameters accessed");
		var data={};
		ArrayUtils.each(Combo_Extra_Property_Field_Names,function(fieldName){
			var val;
			//debugger;
			if(fieldName === "multiple"){
				val = ComponentHelpers.getCheckBoxComponentValue(template,fieldName);
			}else{
				val = ComponentHelpers.getInputValueByName(template,fieldName);
			}

			if(val){
				return data[fieldName] = val;
			}
		});
		return data;
	},

	getComponentValueBySelector: function(template,componentSelector){
		//debugger;
		var componentValue = $(template.find(componentSelector)).val();
		return componentValue;
	},

	getComponentBySelector: function(template,componentSelector){
		//debugger;
		var component = template.find(componentSelector);
		return component;
	},

	getDataListValue:function(template,fieldName){
		var val = $(template.find("input[list='"+fieldName+"']")).val();
		return val;
	},

	getDataListInput:function(template){
		var dataListInput = template.find("input");
		return dataListInput;
	},

	getComponentByName:function(template,name){
		return template.find("input[type='"+name+"']");
	},

	getInputByName:function(template,name){
		//debugger;
		return template.find("input[name='"+name+"']");	
	},

	getInputValueByName:function(template,name){
		//debugger;
		var val = $(ComponentHelpers.getInputByName(template,name)).val();
		return val;
	},

	hasAttribute:function(template,name){
		return $(template).attr(name) !== undefined;
	},

	getComponentValueByNameAttribute:function(template,value){
		return ComponentHelpers.getComponentValueByAttribute(template,"name",value);
	},

	getComponentValueByAttribute:function(template,attributeName,value){
		return ComponentHelpers.getComponentValueBySelector(template,"[" + attributeName + "='"+value+"']");	
	},

	getComponentByAttribute:function(template,attributeName,value){
		return ComponentHelpers.getComponentBySelector(template,"[" + attributeName + "='"+value+"']");
	},

	getComponentValueByIdAttribute:function(template,value){
		return ComponentHelpers.getComponentValueByAttribute(template,"id",value);
	},

	// this function is used to set component value of parent template context when component is rendered
	value:function(){
		return {
			value: function () {
				var templateContext = this;
				console.count("value access count for property : " + templateContext.name);
				//debugger;
				if (Session.get(Add_Model)) {
					// creating new model
				} else {
					// editing existing model
					if(Session.get(Editing_Model)){
						var modelData = TemplateHelpers.getParentFormData(Template.instance());
						var val = modelData[templateContext.name];
						//debugger;
						if (templateContext.type === Data_Type_Derived) {
							//TODO
							//debugger;
							val = DateUtils.getDaysRemaining(modelData["expiry_date"]);
						}
						return val;
					}
				}
			}
		}
	}
};