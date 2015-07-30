Template.my_dynamic_template.helpers({
	getTemplateName:function(){
		debugger;
		var templateType;
		if(this.type === Data_Type_Combo && this.multiple === "true"){
			templateType = "drop_down";
		}else{
			templateType = this.type;
		}
		return TemplateHelpers.getTemplateName(templateType);
	}
});