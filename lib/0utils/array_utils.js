ArrayUtils = {
	removeElementByPropertyNameAndValue:function(array,propertyName,propertyValue){
		return _.reject(array,function(elm){
			return elm[propertyName] === propertyValue;
		});
	},

	removeElementByPropertyNameAndValues:function(array,propertyName,propertyValues){
		var newArray = ArrayUtils.clone(array);
		_.each(propertyValues,function(propertyValue){
			newArray = ArrayUtils.removeElementByPropertyNameAndValue(newArray,propertyName,propertyValue);
		});	
		return newArray;
	},

	removeElementByIndex:function(array,index){
		//debugger;
		array.splice(index,1);
		return array;
	},
	/*removeElementByPropertyName:function(array,propertyName){
		return _.reject(array,function())
	},*/


	contains:function(array,value){
		return _.contains(array,value);
	},

	notIn:function(array,values){
		var result = true;
		_.each(values,function(value){
			if(ArrayUtils.contains(array,value)){
				result = false;
				return result;
			}
		});
		return result;
	},

	clone:function(array){
		return _.map(array,_.clone);
	},

	removeKey:function(array,name){
		return _.map(array,function(elem){
			return ObjectUtils.removeKey(elem,name);
		});
	},

	sum:function(array,propertyName,propertyType){
        //debugger;
        var sum = _.reduce(array,function(total,elem){
            //debugger;
            if(elem[propertyName] && elem[propertyName].trim().length > 0){
                if(typeof elem[propertyName] === "string"){
                    //debugger;
                    //console.log("found elem string type ");
                    if(elem[propertyName].trim().length > 0){
                        if(propertyType === "int"){
                            return total += parseInt(elem[propertyName]);
                        }else if(propertyType === "float"){
                            return total += parseFloat(elem[propertyName]);
                        }else{
                            return total += elem[propertyName];
                        }
                    }else{
                        return total +=0;
                    }
                }else{
                    //console.log("elem is not string");
                    return total += elem[propertyName];
                }
            }else{
                return total+=0;
            }
        },0);
		return sum;
	},

	findElementByPropertyNameAndValue:function(array,propertyName,propertyValue){
		// assuming array is array of objects
		return _.find(array,function(elem){
			return elem[propertyName] === propertyValue;
		});
	},

    findElementByPropertyName:function(array,propertyName){
        // assuming array is array of objects
        return _.find(array,function(elem){
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
		return _.find(array,function(elem){return ObjectUtils.getObjectKeyCount(elem) === maxKeyLength});
	},
	/*inject:function(array,initailValue){
		return _.reduce(array,function(result,elem){

		});
	}*/

    findAllUniqueKeys:function(array){
        // assuming array is an array of objects
        var uniqueKeys = [];
        ArrayUtils.each(array,function(elem){
            var keys = ObjectUtils.getObjectKeys(elem);
            ArrayUtils.each(keys,function(key){
                if(ArrayUtils.contains(uniqueKeys,key)){
                }else{
                    uniqueKeys.push(key);
                }
            });
        });
        return uniqueKeys;
    }
};