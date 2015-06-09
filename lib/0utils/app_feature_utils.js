AppFeatureUtils = {

    getFeatureByUserEmail:function(email){

    },

    getCurrentUserFeatures:function(){
        var models = ModelHelpers.getModel("appfeatures");
        var features = models.find({user:UserHelpers.getLoggedInUserEmailId()}).fetch();
        return features;
    },

    getCurrentUserAppFeature:function(name){
        var models = ModelHelpers.getModel("appfeatures");
        var feature = models.findOne({user:UserHelpers.getLoggedInUserEmailId(),name:name});
        return feature;
    },

    isExportToCSV:function(){

    }
};
