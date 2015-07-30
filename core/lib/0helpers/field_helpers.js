FieldHelpers = {
	getFieldByMaxNumOfAttributes:function(fields){
		var maxAttributeField = ArrayUtils.findByMaxKeys(fields);
		return maxAttributeField;
	},

	/* */
	getFieldNameObjectArray:function(modelId){
        //debugger;
		var fields = ModelHelpers.getEditingModelSubFields(modelId);
		// here fields is array of field objects [{name:"name",type:"string"}]
        return FieldHelpers.getFieldNameObjectArrayByFieldArray(fields);
	},
	getFieldNameObjectArrayByFieldArray:function(fields){
		//debugger;
		// here fields is array of field objects [{name:"name",type:"string"}]
		if(fields.length > 0){
			fields = ArrayUtils.removeKey(fields,"index");
			var fieldNames = ArrayUtils.findAllUniqueKeys(fields);
			// we want array of object of unique field keys eg [{name:"name"},{name:"type"}]
			return ArrayUtils.map(fieldNames,function(fieldName){return {name:fieldName}});
		}else{
			return [];
		}
	}
};