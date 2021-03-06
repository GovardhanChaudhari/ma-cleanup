MeteorUtils = {
    getMeteorRelease:function(){
        return Meteor.release;
    },

    getMeteorVersion:function(){
        var release = MeteorUtils.getMeteorRelease();
        var version = release.split("@")[1];
        return version;
    },

    getPrivateDirPath:function(){
        var currentDir = process.cwd();
        var privateDir = currentDir+ "/assets/app/";
        return privateDir;
    }
};