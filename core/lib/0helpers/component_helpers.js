ComponentHelpers = {

	getComponentBySelector: function(template,componentSelector){
		//debugger;
		var component = template.find(componentSelector);
		return component;
	},

	getComponentValueBySelector: function(template,componentSelector){
		//debugger;
		var componentValue = $(ComponentHelpers.getComponentBySelector(template,componentSelector)).val();
		return componentValue;
	},

	getFoundComponentValue:function(component){
		return $(component).val();
	},

	getComponentByAttribute:function(template,attributeName,value){
		return ComponentHelpers.getComponentBySelector(template,"[" + attributeName + "='"+value+"']");
	},

	getComponentValueByAttribute:function(template,attributeName,value){
		var component = ComponentHelpers.getComponentByAttribute(template,attributeName,value);
		return ComponentHelpers.getFoundComponentValue(component);
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

	isCheckBoxChecked:function(component){
        var value = $(component).is(":checked") ? "true" : "false";
        return value;
    },

	getCheckBoxComponent:function(template,fieldName){
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

	getDropDown:function(template,fieldName){
		var selectBox = ComponentHelpers.getComponentBySelector(template,"select[id='"+fieldName+"']");
		return selectBox;
	},

	getDropDownValue:function(template,fieldName){
		//debugger;
		var selectBox = ComponentHelpers.getDropDown(template,fieldName);
		return ComponentHelpers.getFoundComponentValue(selectBox);
	},

	getDataListValue:function(template,fieldName){
		var val = ComponentHelpers.getComponentValueBySelector(template,"input[list='"+fieldName+"']");
		return val;
	},

	getDataListInput:function(template){
		var dataListInput = ComponentHelpers.getComponentBySelector(template,"input");
		return dataListInput;
	},

	getInputByType:function(template,name){
		return ComponentHelpers.getComponentBySelector(template,"input[type='"+name+"']");
	},

	getInputByName:function(template,name){
		//debugger;
		return ComponentHelpers.getComponentBySelector(template,"input[name='"+name+"']");
	},

	getInputValueByName:function(template,name){
		//debugger;
		var val = ComponentHelpers.getFoundComponentValue(ComponentHelpers.getInputByName(template,name));
		return val;
	},

	hasAttribute:function(template,name){
		return $(template).attr(name) !== undefined;
	},

	getComponentValueByNameAttribute:function(template,value){
		return ComponentHelpers.getComponentValueByAttribute(template,"name",value);
	},

	getComponentValueByIdAttribute:function(template,value){
		return ComponentHelpers.getComponentValueByAttribute(template,"id",value);
	},

	// this function is used to set component value of parent template context when component is rendered
	value:function(){
		var templateContext = this;
		//console.count("value access count for property : " + templateContext.name);
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
	},

	getComponentValueHelper:function(){
		return {value:ComponentHelpers.value};
	}
};