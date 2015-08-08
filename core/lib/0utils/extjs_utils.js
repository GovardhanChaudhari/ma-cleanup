ExtJsUtils = {
	generateColumnDataArray:function(){
		var fields = ModelDefHelpers.getCurrentModelFields();
		return ArrayUtils.map(fields,function(field){
			return {text:field.name,width:100,dataIndex:field.name,filterable:true,filter:{type:'date'}};
		});
	},

	getCurrentModelFieldNames:function(){
		var fields = ModelDefHelpers.getCurrentModelFields();
		return ArrayUtils.map(fields,function(field){
			return field.name;
		})
	}
};