ExportUtils = {
	exportModelToCSV:function(modelName,options){
		var model = ModelHelpers.getModel(modelName);
		var models = model.getModelList(options);
		debugger;
		models = ArrayUtils.removeKey(models,"_id");
		var fileName =  modelName + ".csv";
		var csv = CsvUtils.JSON2CSV(models,{includeLabel:true,labelInQuotes:false,valueInQuotes:true});
		ClientHelpers.saveFileAsCSV(csv,fileName);
	},

	exportModelToJSON:function(modelName,options){
		var model = ModelHelpers.getModel(modelName);
		var models = model.getModelList(options);
		debugger;
		models = ArrayUtils.removeKey(models,"_id");
		var fileName =  modelName + ".json";
		var data = JSON_Utils.stringify(models);
		ClientHelpers.saveFileAsJSON(data,fileName);
	},

	exportModelsToZip:function(modelDefs,zipFilePath,options){
		var zip = new ZipZap();
		_.each(modelDefs,function(userModelDef){
			var modelInstance = ModelHelpers.getModel(userModelDef.name);
			var fileName = modelInstance.name + ".csv";
			var models =ModelHelpers.getModelInstancesByName(modelInstance.name);
			models = ArrayUtils.removeKey(models,"_id");
			var csv = CsvUtils.JSON2CSV(models,{includeLabel:true,labelInQuotes:false,valueInQuotes:true});
			zip.file(fileName,csv);
		});
		zip.saveAs(zipFilePath);
	}
};