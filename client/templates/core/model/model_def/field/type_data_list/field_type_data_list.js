Template.field_type_data_list.helpers({
	options:function(){
		//return [{"_id":"1",f:"one"},{"_id":"2",f:"two"}];
		//console.log(this);
		var models;
		if(this.model_name){
			models = MongoUtils.getCollection(this.model_name).find().fetch();
		}else{
			console.log("Error: you must provide model_name");
			models = [];
		}
		return models;
	},

	name:function(){
		return this.name;
	}
});

Template.field_type_data_list_input.helpers({
	name:function(){
		return this.name;
	},

	value:function(){
		var val = this.value;
		return val;
	}
});

Template.field_type_data_list_input.events({
	'input':function(evt,template){
		console.log("event:input data list input has changed");
		var field_form = TemplateHelpers.getParentTemplate(template,"field_form");
		var val = $(evt.target).val();
		if(val === Data_Type_Combo || val === Data_Type_DropDown){
			field_form.isCombo.set(true);
		}else{
			field_form.isCombo.set(false);
		}
	}
});

Template.field_type_data_list_option.helpers({
	value:function(){
		//console.log("accessed data list option value");
		if(ObjectUtils.isPrimitive(this.data)){
			return this.data;
		}else{
			var grandParent = Template.parentData(2);
			var val;
			var displayValue;
			if(grandParent.display_value){
				displayValue = grandParent.display_value;
			}else if(this && this.display_value){
				displayValue = this.display_value;
			}

			if(displayValue){
				val = ModelHelpers.getModelPropertyValue(grandParent.model_name,this.data,displayValue);
			}else{
				console.log("Error: could not get display_value");
				val = "";
			}
			return val;	
		}
	},	

	optionValue:function(){
		if(ObjectUtils.isPrimitive(this.data)){
			return this.data;
		}else{
			var grandParent = Template.parentData(2);
			var val;
			if(grandParent.option_value){
				val = this.data[grandParent.option_value];
			}else if(grandParent.display_value){
				val = this.data[grandParent.display_value];	
			}else{
				console.log("Error: could not get option_value");
				val = "";
			}
		}
		return val;
	}
});