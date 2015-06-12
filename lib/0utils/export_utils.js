ExportUtils = {
	exportModels:function(modelDefs,options){
		_.each(modelDefs,function(userModelDef){
			var modelInstance = ModelHelpers.getModel(userModelDef.name);
			ClientHelpers.exportModel(modelInstance,options);
		});
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
		/*var output = zip.generate({
			type:        "nodebuffer",
			compression: "DEFLATE"
		});
		var blob = new Blob([output], {type: "application/octet-stream"});
		saveAs(blob, fileName);*/
	}
};