ClientHelpers = {
	exportModel:function(modelInstance,options){
		var models = modelInstance.getModelList(options);
		debugger;
		models = ArrayUtils.removeKey(models,"_id");
		var fileName =  modelInstance.name + ".csv";
		//debugger;
		var csv = CsvUtils.JSON2CSV(models,{includeLabel:true,labelInQuotes:false,valueInQuotes:true});
		//console.log("csv : " + csv);
		var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
		saveAs(blob, fileName);
	}
};