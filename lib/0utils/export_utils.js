ExportUtils = {
	exportModels:function(modelDefs,options){
		_.each(modelDefs,function(userModelDef){
			var modelInstance = ModelHelpers.getModel(userModelDef.name);
			ClientHelpers.exportModel(modelInstance,options);
		});
	}
}