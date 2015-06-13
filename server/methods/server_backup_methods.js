Meteor.methods({
    createBackupDir:function(models){
        var backupConfig = SystemConfigHelpers.getBackupConfig();
        var backupPath = backupConfig.default_dir;
        var dirName = DateUtils.getCurrentDateTimeString();
        //console.log("creating dir at: ", backupPath,"with name: ", dirName);
        var privateDir = MeteorUtils.getPrivateDirPath();
        //TODO remove id field from model list
        ExportUtils.exportModelsToZip(models,privateDir+ "/"+backupPath+"/"+dirName+".zip");
    }
});