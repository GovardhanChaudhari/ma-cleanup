Template.field_form.created = function(){
	TemplateHelpers.setAppFormGetValueFunction.apply(this);
};

Template.field_form.rendered = function(){
    var template = this;
	//TODO get subform data depending on condition
	console.log("field form index: ", this.index);
	//this.data = this.data.data;
};

Template.field_form.helpers({
	isEditing:function(){
		return (Session.get(Editing_Field) !== null && Session.get(Editing_Field) !== undefined);
	}
});