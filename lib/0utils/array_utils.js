ArrayUtils = {

	reject:function(array,callback){
		return _.reject(array,callback);
	},

	removeElementByPropertyNameAndValue:function(array,propertyName,propertyValue){
		return ArrayUtils.reject(array,function(elm){
			return elm[propertyName] === propertyValue;
		});
	},

	removeElementByPropertyNameAndValues:function(array,propertyName,propertyValues){
		var newArray = ArrayUtils.clone(array);
		ArrayUtils.each(propertyValues,function(propertyValue){
			newArray = ArrayUtils.removeElementByPropertyNameAndValue(newArray,propertyName,propertyValue);
		});	
		return newArray;
	},

	removeElementByIndex:function(array,index){
		var newArray = ArrayUtils.clone(array);
		newArray.splice(index,1);
		return newArray;
	},

	contains:function(array,value){
		return _.contains(array,value);
	},

	notIn:function(array,values){
		return ArrayUtils.every(values,function(value){
			return !ArrayUtils.contains(array,value);
		});
	},

	every:function(array,predicate,context){
		return _.every(array,predicate,context);
	},

	clone:function(array){
		return ArrayUtils.map(array,_.clone);
	},

	removeKey:function(array,name){
		return ArrayUtils.map(array,function(elem){
			return ObjectUtils.removeKey(elem,name);
		});
	},

	removeElementByPropertyName:function(array,name){
		return ArrayUtils.reject(array,function(elem){
			return elem[name] !== undefined;
		});
	},

	sum:function(array,propertyName,propertyType){
        var sum = ArrayUtils.reduce(array,function(total,elem){
            if(elem[propertyName] && elem[propertyName].trim().length > 0){
                if(typeof elem[propertyName] === "string"){
                    //debugger;
                    //console.log("found elem string type ");
                    if(elem[propertyName].trim().length > 0){
                        if(propertyType === "int"){
                            total += parseInt(elem[propertyName]);
                        }else if(propertyType === "float"){
                            total += parseFloat(elem[propertyName]);
                        }else{
                            total += elem[propertyName];
                        }
                    }
                }else{
                    //console.log("elem is not string");
                    total += elem[propertyName];
                }
            }
			return total;
        },0);
		return sum;
	},

	find:function(array,callback){
		return _.find(array,callback);
	},

	findElementByPropertyNameAndValue:function(array,propertyName,propertyValue){
		// assuming array is array of objects
		return ArrayUtils.find(array,function(elem){
			return elem[propertyName] === propertyValue;
		});
	},

    findElementByPropertyName:function(array,propertyName){
        // assuming array is array of objects
        return ArrayUtils.find(array,function(elem){
            return elem[propertyName] !== undefined
        });
    },

	map:function(array,callback){
		return _.map(array,callback);
	},

	each:function(array,callback){
		return _.each(array,callback);
	},

	findByMaxKeys:function(array){
		var maxKeyLengthObj = _.max(array,function(elem){return ObjectUtils.getObjectKeyCount(elem);});
		var maxKeyLength = ObjectUtils.getObjectKeyCount(maxKeyLengthObj);
		console.log("found max len : " + maxKeyLength);
		return ArrayUtils.find(array,function(elem){return ObjectUtils.getObjectKeyCount(elem) === maxKeyLength});
	},

    findAllUniqueKeys:function(array){
        // assuming array is an array of objects
        return ArrayUtils.reduce(array,function(uniqueKeys,elem){
            var keys = ObjectUtils.getObjectKeys(elem);
            ArrayUtils.each(keys,function(key){
                if(!ArrayUtils.contains(uniqueKeys,key)){
                    uniqueKeys.push(key);
                }
            });
			return uniqueKeys;
		},[]);
    },

	reduce:function(array,func,initialState){
		return _.reduce(array,func,initialState);
	},

	filter:function(array,predicate,context){
		return _.filter(array,predicate,context);
	}
};