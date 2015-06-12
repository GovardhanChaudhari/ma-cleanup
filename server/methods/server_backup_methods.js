Meteor.methods({
    createBackupDir:function(models){
        var backupConfig = SystemConfigHelpers.getBackupConfig();
        var backupPath = backupConfig.default_dir;
        var dirName = DateUtils.formatDate(new Date(),"DD_MM_YYYY_HH_mm_ss");
        console.log("creating dir at: ", backupPath,"with name: ", dirName);
        var privateDir = MeteorUtils.getPrivateDirPath();
        ExportUtils.exportModelsToZip(ModelDefHelpers.getCustomeModelDefs(),privateDir+ "/"+backupPath+"/"+dirName+".zip");
    }
});