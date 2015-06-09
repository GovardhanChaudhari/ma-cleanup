System_Defaults_Helpers = {
    getDefaultModelDefs: function () {
        return System_Defaults_Helpers.getDefaultsByFileName(ModelDefs_Json_File_Name);
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
        var adminUserData = System_Defaults_Helpers.getDefaultsByFileName(Admin_User_Json_File_Name);
        return adminUserData;
    }
};
