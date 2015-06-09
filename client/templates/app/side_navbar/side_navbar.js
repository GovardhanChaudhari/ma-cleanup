Template.side_navbar.helpers({
	baseModels: function(){
		var models = ModelDefHelpers.getBaseModelDefs();
		//debugger;
		return models;
	},

	userModels:function(){
		if(UserHelpers.isAdmin()){
			return ModelDefHelpers.getCustomeModelDefs();
		}else{
			return ModelDefHelpers.getCustomeModelDefs(UserHelpers.getLoggedInUserId());
		}

	}
});

Template.model.events({
	'click' : function(evt,template){
		console.log("clicked model def id : " + template.data._id);
		Session.set(Search_Data,null);
		Session.set(Current_Model_Id,template.data._id);
	}
});

