/**
 * Created by gvc on 13-05-2015.
 */
Meteor.methods({
    publishModel:function(modelName){
        console.log("server called publish model " + modelName);
        ModelHelpers.publishModel(modelName);
    },
    resetModelDefs: function () {
        var modelDefs = SystemDefaultsHelpers.getDefaultModelDefs();
        DBUtils.removeAll(ModelDefDb);
        DBUtils.insertAll(ModelDefDb,modelDefs);
    }
});