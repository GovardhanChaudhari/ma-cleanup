CsvUtils = {

	JSON2CSV : function(objArray,options) {
    //TODO use new array to store sorted key objects
    objArray = CsvUtils.__sortKeysOfObjectArray(objArray);        
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if (options.includeLabel) {
        var head = array[0];
        if (options.labelInQuotes) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if (options.labelInQuotes) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
            }
        } else {
            for (var index in array[i]) {
                var obj = array[i][index];
                if(!ObjectUtils.isPrimitive(obj)){
                    obj = JSON.stringify(obj);
                    obj = obj.replace(/"/g,"\'");
                }
                if(options.valueInQuotes){
                    line += "\"" + obj + "\"" + ',';
                }else{
                    line += obj + ',';
                }
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
    
},

    CSVToJSON:function(csvData,callback){
        var Converter=Meteor.npmRequire("csvtojson").core.Converter;
        var csvConverter=new Converter({constructResult:true,checkType:false});
        if(callback){
            console.log("found callback");
            csvConverter.fromString(csvData,callback);
        }else{
            var obj =  csvConverter.fromString(csvData); 
            console.log("no callback obj is : " + obj);
            return obj;
        }
    },

    __sortKeysOfObjectArray:function(objectArray){
        return ArrayUtils.map(objectArray,function(obj){
            return ObjectUtils.sortByKeys(obj);
        });
    }
};