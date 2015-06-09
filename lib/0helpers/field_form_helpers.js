Field_Form_Helpers = {
    getAffectFieldData:function(template){
        var data={};
        ArrayUtils.each(Affect_Field_Names,function(fieldName){
            var val;
            //debugger;
            val = ComponentHelpers.getInputValueByName(template,fieldName);
            if(val){
                return data[fieldName] = val;
            }
        });
        return data;
    }
};