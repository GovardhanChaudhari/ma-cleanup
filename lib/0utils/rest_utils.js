RESTUtils = {
    createRestApiByCollection:function(collection,options){
        options = options || {};
        try{
            Restivus.addCollection(collection,options);
        }catch(exp){
            console.log("Error occurred while creating REST Api for collection: ",exp);
        }
    },

    createRestApiByCollectionName:function(collectionName,options){
        options = options || {};

        //var collection = ModelHelpers.getFeaturedModel(collectionName);
        var collection = MongoUtils.getCollection(collectionName);
        RESTUtils.createRestApiByCollection(collection,options);
    },

    serverCreateRESTAPIByCollectionName:function(collectionName,options){
        Meteor.call("createRESTAPIByCollectionName",collectionName,options);
    }
};
