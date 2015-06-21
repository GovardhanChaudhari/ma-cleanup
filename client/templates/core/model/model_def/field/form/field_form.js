Template.field_form.created = function(){
	TemplateHelpers.setAppFormGetValueFunction.apply(this);
};

Template.field_form.rendered = function(){
    var template = this;
	//TODO get subform data depending on condition
	console.log("field form index: ", this.index);
	//this.data = this.data.data;
};

Template.field_form.events({
	'click ul li.advanced':function(evt,template){
		console.log("click advanced tab");
		EventUtils.stopDefault(evt);
		//RouterHelpers.showEditModelDefAdvancedFieldForm(ModelDefHelpers.getEditingModelDefId(),Session.get(Editing_Field));
		$("#form_field_tabs li a:last").tab('show');

	},
	'click ul li.basic':function(evt,template){
		console.log("click basic tab");
		EventUtils.stopDefault(evt);
		//RouterHelpers.showEditModelDefAdvancedFieldForm(ModelDefHelpers.getEditingModelDefId(),Session.get(Editing_Field));
		$("#form_field_tabs li a:first").tab('show');

	}
});

Template.field_form.helpers({
	isEditing:function(){
		return (Session.get(Editing_Field) !== null && Session.get(Editing_Field) !== undefined);
	}
});

