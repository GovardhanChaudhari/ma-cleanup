Meteor.methods({

    createDb:function(dbName){
        console.log("server: creating db: " + dbName);
        var model = new Mongo.Collection(dbName);
    },

    removeDb:function(dbName){
        console.log("server : removing db : " + dbName);
        //ModelHelpers.unPublishModel(dbName);
    },


    removeAll:function(modelName){
        var model = Mongo.Collection.get(modelName);
        model.remove({});
    },

    remove:function(collectionName,id){
        console.log("server : called remove method");
        var collection = MongoUtils.getModel(collectionName);

        console.log("found collection ", collection);

        DBUtils.allowDeleteOperation(collection,true);
        return collection.remove(id);
        DBUtils.allowDeleteOperation(collection,false);
    },

    removeMeteorUser: function (meteorUserId) {
        UserHelpers.removeMeteorUser(meteorUserId);
    },

    removeRecord:function(collection,id){
        DBUtils.allowDeleteOperation(collection,true);

        DBUtils.remove(collection,id);

        DBUtils.allowDeleteOperation(collection,false);
    }
});