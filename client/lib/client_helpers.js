ClientHelpers = {
	saveFileAsCSV:function(fileData,fileName){
		var blob = new Blob([fileData], {type: "text/csv;charset=utf-8"});
		saveAs(blob, fileName);
	},

	saveFileAsJSON:function(fileData,fileName){
		var blob = new Blob([fileData], {type: "text/json;charset=utf-8"});
		saveAs(blob, fileName);
	}
};