SystemDefaultsHelpers = {
    getDefaultModelDefs: function () {
        return SystemDefaultsHelpers.getDefaultsByFileName(ModelDefs_Json_File_Name);
    },

    getDefaultModelDefByName:function(name){
        var modelDefs = SystemDefaultsHelpers.getDefaultModelDefs();
        return ArrayUtils.findElementByPropertyNameAndValue(modelDefs,"name",name);
    },

    getDefaultsByFileName:function(fileName){
        var modelDefsJson = Assets.getText(System_Data_Defaults_Path + "/" + fileName);
        //console.log("found model def data : ",modelDefsJson);
        var cleanedModelDefJSON = StringUtils.removeAllWhiteSpaces(modelDefsJson);
        //console.log("after clean model def data : ",cleanedModelDefJSON);
        var modelDefs = JSON_Utils.parse(cleanedModelDefJSON);
        return modelDefs;
    },

    getAdminUserDefaults:function(){
        var adminUserData = SystemDefaultsHelpers.getDefaultsByFileName(Admin_User_Json_File_Name);
        return adminUserData;
    }
};
