MeteorUtils = {
    getMeteorRelease:function(){
        return Meteor.release;
    },

    getMeteorVersion:function(){
        var release = MeteorUtils.getMeteorRelease();
        var version = release.split("@")[1];
        return version;
    }
};