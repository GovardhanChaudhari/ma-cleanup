ObjectUtils = {
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
		delete obj[key];
		return obj;
	},

	removeKeys:function(obj,keys){
		ArrayUtils.each(keys,function(key){
			obj = ObjectUtils.removeKey(obj,key);
		});
		return obj;
	},

	removeBlankProperties:function(obj){
		var properties = Object.keys(obj);
		_.each(properties,function(property){
			// assuming values is of string type
			if(obj[property].length === 0){
				ObjectUtils.removeKey(obj,property);
			}
		});
	},

	sortByKeys:function(obj){
		var keys = [];
	    var sorted_obj = {};

	    for(var key in obj){
	        if(obj.hasOwnProperty(key)){
	            keys.push(key);
	        }
	    }

	    // sort keys
	    keys.sort();

	    // create new array based on Sorted Keys
	    ArrayUtils.each(keys, function( key){
	        sorted_obj[key] = obj[key];
	    });

	    return sorted_obj;

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
		//TODO clone object
		var val = obj[oldKey];
		obj = ObjectUtils.removeKey(obj,oldKey);
		obj[newKey] = val;
		return obj;
	}
};