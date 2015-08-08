ModelHelpers = {
	getFeaturedModel:function(name){
		var model = ModelDefHelpers.getModelDefByName(name);
		var mongoModel = ModelHelpers.subscribeModel(name);
		model = ObjectUtils.merge(mongoModel,model);
		ModelHelpers.addGenericMethods(model,name);
		return model;
	},

	addGenericMethods:function(model,modelName){
		
		if(!model.getModelList){
				model.getModelList = function(options){
				options = options || {};
				var models = model.find(options).fetch();
				//console.log(models);
				return models;
			};	
		}
		

		model.blank = function(){
			var data = {};
			data["name"] = "";
			_.each(model.fields,function(field){
				data[field.name] = '';
				//data[field.type] = 'string';
			});
			return data;
		};


		if(!model.create){
			model.create = function(data){
                // returns id
				return model.insert(data);
			}
		}

		if(!model.delete){
			model.delete = function(data,isServerOperation){
				// returns id
				isServerOperation = isServerOperation || false;
				if(isServerOperation){
					Meteor.call("remove")
				}else{
					return model.remove(data);
				}

			}
		}
	},

	publishModel:function(name){
		Meteor.publish(name,function(modelName,opts){
			opts = opts || {};
			if(opts === false){
				console.log("unsubscribing model : " + modelName );
				console.log("is this server code : " + Meteor.isServer);
				this.stop();
			}else{
				console.log("publishing model ",name);
				var collection = MongoUtils.getCollection(name);
				RESTUtils.createRestApiByCollection(collection);
				collection.allow({
					insert:function(){
						return PermissionHelpers.checkDefaultUserPermissions(collection,this.userId,PERMISSION_INSERT);
					},

					update:function(){
						console.log("allowing update operation for model ",name);
						return PermissionHelpers.checkDefaultUserPermissions(collection,this.userId,PERMISSION_UPDATE);
					},

					remove: function () {
						return PermissionHelpers.checkDefaultUserPermissions(collection,this.userId,PERMISSION_DELETE);
					}
				});
				// Note that find method returns a cursor which is used reactively. If
				//* we used find.fetch() then it returns an array which might not be used reactively*//*
				return collection.find(opts);
				//this.ready();
			}

			this.onStop(function(){
				console.log("in publish model, event onStop");
			});
		});
	},

	subscribeModel:function(modelName,options){
		//debugger;
        var model = MongoUtils.getCollection(modelName);
        //var model = new Mongo.Collection(modelName);
		Meteor.subscribe(modelName,modelName,options);
		return model;
	},

	publishAndSubscribeModel:function(modelName){
		Meteor.call("publishModel",modelName);
		ModelHelpers.subscribeModel(modelName);
	},

	unSubscribeModel:function(modelName){
		Meteor.subscribe(modelName,modelName,false);
	},

	isModelExist:function(modelDb,property,val){
		var searchData = {};
		searchData[property] = val; 
		var model = modelDb.findOne(searchData);
		return model;
	},

	getDerivedPropertyValue:function(model,fieldDef){
		// here fieldDef is {name:"",type:"",property_one:""} object
		var value="";
		ArrayUtils.each(Derived_Property_Field_Names,function(propertyName){
			if(model[fieldDef[propertyName]]){
				value += model[fieldDef[propertyName]] + " ";	
			}
		});

	  	return value.trim();
	},

	getModel:function(name){
		var model = MongoUtils.getModel(name);
		ModelHelpers.addGenericMethods(model,name);
		model.name = name;
		return model;
	},

	getCurrentEditingModelData:function(){
		return Session.get(Current_Editing_Model_Data);
	},

	renameModelProperty:function(model,oldProperty,newProperty){
		ArrayUtils.each(model.find().fetch(),function(modelInstance){
			if(modelInstance.hasOwnProperty(oldProperty)){
				var newModelInstance = ObjectUtils.renameKey(modelInstance,oldProperty,newProperty);
				DBUtils.update(model,modelInstance._id,newModelInstance);
			}else{
				console.log("Error: model instance:",modelInstance, " does not have property:",oldProperty);
			}
		});
	},

	getModelInstanceById:function(id){
		var models = ModelHelpers.getModel(ModelDefHelpers.currentModel().name);
		var modelInstance = models.findOne({_id:id});
		return modelInstance;
	},

	getModelInstancesByName:function(name,options){
		var models = ModelHelpers.getModel(name);
		var modelInstances = models.getModelList(options);
		return modelInstances;
	}
};