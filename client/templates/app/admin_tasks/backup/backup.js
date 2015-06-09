Template.backup.helpers({
	checked:function(){
		return false;
	}
});

Template.backup.events({
	'click .backup_model_instance':function(evt,template){
		var userModelDefs = ModelDefHelpers.getCustomeModelDefs(UserHelpers.getLoggedInUserId());
		ExportUtils.exportModels(userModelDefs);
	},

	'click .backup_model_def':function(evt,template){
		var modelDefs = ModelDefHelpers.getBaseModelDefs();
		ExportUtils.exportModels(modelDefs);
	},

	'click .backup_all':function(evt,template){
		var modelDefs = ModelDefHelpers.getAllModelDefs();
		ExportUtils.exportModels(modelDefs);
	}
});
