Meteor.startup(function(){
	console.log("Bootstrapping client **************************");

	Session.setDefault(Current_Model,"model");
	Session.setDefault(Show_Model_Form, false);
	Session.setDefault(Editing_Model,null);
    Session.setDefault(Editing_ModelDefId,null);
	Session.setDefault(Editing_Field,null);

	//console.log("is model ready *** : " + handler.ready());
	console.log("**************************");
});