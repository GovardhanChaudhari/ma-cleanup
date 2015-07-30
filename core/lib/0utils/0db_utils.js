DBUtils={
	insert:function(collection,data){
		return collection.insert(data);
	},

	insertAll:function(collection,array){
		ArrayUtils.each(array,function(data){
			DBUtils.insert(collection,data);
		});
	},

	insertIfNotExist:function(collection,data){
		if(!collection.findOne(data)){
			DBUtils.insert(collection,data);
		}
	},

	insertIfNotFound:function(collection,searchCriteria,data){
		if(!collection.findOne(searchCriteria)){
			return DBUtils.insert(collection,data);
		}
	},

	update:function(model,id,data){
		if(data.hasOwnProperty("_id")){
			data = ObjectUtils.removeKey(data,"_id");
		}
		return model.update(id,{$set:data});
	},

    remove:function(model,id){
        return model.remove(id);
    },

	removeAll:function(model){
		model.remove({});
	},

    count:function(modelName){
        return Mongo.Collection.get(modelName).find().count();
    },

    sum:function(model,field){
        return ArrayUtils.sum(model.getModelList(),field.name,field.type);
    },

	allowDeleteOperation: function (collection,isOperationAllowed) {
		collection.allow({remove: function () {
			return isOperationAllowed;
		}});
	},

	serverRemoveRecord:function(collectionName,id){
		Meteor.call("remove",collectionName,id);
	}
};