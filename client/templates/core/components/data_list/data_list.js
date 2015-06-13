Template.data_list.created = TemplateHelpers.setParentForm;

Template.data_list.rendered = function(){
	var template = this;
	this.getValue = function(){
		return ComponentHelpers.getDataListValue(template,template.data.name);
	}
};

Template.data_list_internal.helpers({
	items:function(){
		//return [{"_id":"1",f:"one"},{"_id":"2",f:"two"}];
		//console.log(this);

		var models;
		if(this.model_name){
			models = MongoUtils.getCollection(this.model_name).find().fetch();
		}else{
			console.log("Error: you must provide model_name");
			models = [];
		}
		//debugger;
		return models;
	}
});

Template.data_list_input.helpers(ComponentHelpers.getComponentValueHelper());

Template.data_list_option.helpers({
	value:function(){
		//console.log("accessed data list option value");
		//debugger;
		if(ObjectUtils.isPrimitive(this)){
			return this;
		}else{
			var grandParent = Template.parentData(1);
			var val;
			if(grandParent.display_value){
				val = this[grandParent.display_value];
			}else{
				console.log("Error: could not get display_value");
				val = "";
			}
			return val;	
		}
	},	

	optionValue:function(){
		if(ObjectUtils.isPrimitive(this)){
			return this;
		}else{
			var grandParent = Template.parentData(1);
			var val;
			if(grandParent.option_value){
				val = this[grandParent.option_value];
			}else if(grandParent.display_value){
				val = this[grandParent.display_value];	
			}else{
				console.log("Error: could not get option_value");
				val = "";
			}
		}
		return val;
	}
});