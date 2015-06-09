/**
 * Created by gvc on 13-05-2015.
 */
Meteor.methods({
    publishModel:function(modelName){
        console.log("server called publish model " + modelName);
        ModelHelpers.publishModel(modelName);
    },
    resetModelDefs: function () {
        var modelDefs = System_Defaults_Helpers.getDefaultModelDefs();
        DBUtils.removeAll(ModelDefDb);
        DBUtils.insertAll(ModelDefDb,modelDefs);
    }
});