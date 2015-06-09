Template.new_type_field_data_list.created = function(){
	console.log("adding input event to data_list_input");

	var inputEventObject = ArrayUtils.findElementByPropertyName(Template.data_list_input.__eventMaps,"input");
	if(!inputEventObject){
		Template.data_list_input.events({
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
	}
};

Template.new_type_field_data_list.destroyed = function(){
	var childTemplate = Template.data_list_input;
	console.log("destroying input event for template: ",this.view.name);
	Template.data_list_input.__eventMaps = ArrayUtils.removeElementByPropertyName(Template.data_list_input.__eventMaps,"input");
};