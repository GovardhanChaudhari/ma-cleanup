ObjectUtils = {

	clone: function (obj) {
		return _.clone(obj)
	},

	merge:function(src,dest){
		return _.extend(src,dest);
	},

	printDetails:function(object){
		var output = "";
		for (var property in object) {
 		  output += property + ": " + object[property] + ",";
		}
		return output;
	},
	isPrimitive:function(arg) {
  		var type = typeof arg;
  		return arg == null || (type != "object" && type != "function");
	},

	removeKey:function(obj,key){
		var newObj = ObjectUtils.clone(obj);
		delete newObj[key];
		return newObj;
	},

	removeKeys:function(obj,keys){
		return ArrayUtils.reduce(ObjectUtils.getObjectKeys(obj),function(newObject,key){
			if(!ArrayUtils.contains(keys,key)){
				newObject[key] = obj[key];
			}
			return newObject;
		},{});
	},

	removeBlankProperties:function(obj){
		var properties = Object.keys(obj);
		return ArrayUtils.reduce(properties,function(newObject,property){
			// assuming values is of string type
			if(obj[property].length !== 0) {
				newObject[property] = obj[property];
			}
			return newObject
		},{});
	},

	sortByKeys:function(obj){
		var filteredKeys = ArrayUtils.filter(ObjectUtils.getObjectKeys(obj), function (key) {
			return obj.hasOwnProperty(key);
		});

		filteredKeys.sort();

		return ArrayUtils.reduce(filteredKeys, function (sortedObject,key) {
			sortedObject[key] = obj[key];
			return sortedObject;
		},{});
	},

	booleanToString:function(value){
		var newValue = value || false;
		return newValue.toString();
	},

	stringToBoolean:function(value){
		return String(value).trim().toLowerCase() === "true";
	},

	getObjectKeys:function(obj){
		return Object.keys(obj);
	},

	getObjectKeyCount:function(obj){
		return ObjectUtils.getObjectKeys(obj).length;
	},

	renameKey:function(obj,oldKey,newKey){
		var newObject = ObjectUtils.clone(obj);
		var val = newObject[oldKey];
		newObject = ObjectUtils.removeKey(newObject,oldKey);
		newObject[newKey] = val;
		return newObject;
	}
};