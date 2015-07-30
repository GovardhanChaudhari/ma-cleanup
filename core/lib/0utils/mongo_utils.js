MongoUtils = {
	createModel:function(modelName){
		return new Mongo.Collection(modelName);	
	},

	createModelIfNotExists:function(modelName){
		var model = MongoUtils.getModel(modelName);
		if(model){
		}else{
			new MongoUtils.createModel(modelName);
		}
	},

	addData:function(model,data){
		if(model.find().count() === 0){
			model.insert(data);
		}	
	},

	clearData:function(model){
		model.remove({});
	},

	observeAdd:function(modelName){
		console.log("adding add observer for model : " + modelName);
		var userCursor = Mongo.Collection.get(modelName).find();
		userCursor.observe(
			{
				added:function(user,beforeIndex){
					console.log("adding user to model db:" + user.user_name);
				}
			}
		);
	},

	getCollection:function(name){
		var collection;
		//TODO
		try{
			collection = Mongo.Collection.get(name);
		}catch(e){
			//console.log(e);
			collection = new Mongo.Collection(name);
		}
        //debugger;

        if(!collection){
            collection = new Mongo.Collection(name);
        }
		return collection;
	},

	getModel:function(name){
		var collection = Mongo.Collection.get(name);
		return collection;
	}
};