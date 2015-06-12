SystemConfigHelpers={
    getEmailConfig:function(){
        return SystemConfigHelpers.getConfigByFileName(Mail_Config_File_Name);
    },
    getConfigByFileName:function(fileName){
        var modelDefsJson = Assets.getText(System_Data_Config_Path + "/" + fileName);
        //console.log("found model def data : ",modelDefsJson);
        var cleanedModelDefJSON = StringUtils.removeAllWhiteSpaces(modelDefsJson);
        //console.log("after clean model def data : ",cleanedModelDefJSON);
        var modelDefs = JSON_Utils.parse(cleanedModelDefJSON);
        return modelDefs;
    },

    getSystemConfig:function(){
        return SystemConfigHelpers.getConfigByFileName(System_Config_File_Name);
    },

    getBackupConfig: function () {
        return SystemConfigHelpers.getConfigByFileName(System_Config_File_Name).data_backup;
    }


};
