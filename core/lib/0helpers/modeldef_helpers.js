ModelDefHelpers={
	currentModel:function(){
		if(ModelDefHelpers.hasModelDefs()){
			var currentModel = ModelDefHelpers.getModelDefById(RouterHelpers.getCurrentModelDefId());
			var mongoModel = MongoUtils.getModel(currentModel.name);

			if(!mongoModel){
				console.log("could not get mongo model by name : ",currentModel.name);
			}

			console.count("currentModel accessed ********");
			//DBLogger.debug("mongo model : " + mongoModel);
			currentModel = ObjectUtils.merge(mongoModel,currentModel);
			ModelHelpers.addGenericMethods(currentModel,currentModel.name);
			return currentModel;
		}else{
			return null;
		}
	},

	isModelDefinition:function(name){
		return (name === ModelDb_Name);
	},

	hasModelDefs:function(){
		return ModelDefDb.find().count() !== 0;
	},

	addModelDef:function(modelDef){
		if(!ModelDefDb.findOne({name:modelDef.name})){
			ModelDefDb.insert(modelDef);
		}
	},

	getAllModelDefs:function(){
		return ModelDefDb.find().fetch();
	},

	getBaseModelDefs:function(){
		return ModelDefDb.find({isBaseModel:"true"}).fetch();
	},

	// meteor userId is optional
	getCustomeModelDefs:function(meteorUserId){
		if(meteorUserId){
			return ModelDefDb.find({name:{$nin:Base_Models},ownerId:meteorUserId,isBaseModel:"false"}).fetch();
		}else{
			return ModelDefDb.find({name:{$nin:Base_Models},isBaseModel:"false"}).fetch();
		}
	},

	getModelDefById:function(id){
		var modelDef = ModelDefDb.findOne({_id:id});
		//debugger;
		return modelDef;
	},

	getModelDefByName:function(name){
		return ModelDefDb.findOne({name:name});
	},

	getModelDefFields:function(name){
		return ModelDefHelpers.getModelDefByName(name).fields;
	},

	getEditingModelDefId:function(){
		return Session.get(Editing_ModelDefId)
	},

	getEditingModelDef:function(){
		return ModelDefHelpers.getModelDefById(ModelDefHelpers.getEditingModelDefId());
	},

	getEditingModelSubFields:function(modelId){
		if(modelId){
			return ModelDefHelpers.currentModel().findOne(modelId).fields;
		}else{
			return ModelDefHelpers.currentModel().findOne(Session.get(Editing_Model)).fields;
		}
	},

	getCurrentModelDefId:function(){
		//return ModelDefHelpers.currentModel()._id;
		return RouterHelpers.getCurrentModelDefId();
	},

	getCurrentModelName:function(){
		return ModelDefHelpers.getModelDefById(RouterHelpers.getCurrentModelDefId()).name
	},

	getCurrentModelFields:function(options){
		options = options || {};
		var fields = ModelDefHelpers.getModelDefFields(ModelDefHelpers.getCurrentModelName());
		if(options.includeHidden === false){
			fields = ArrayUtils.removeElementByPropertyNameAndValue(fields,"hide",true);
		}
		return fields;
	},

	// assuming model definition has only one affected model field
	getAffectedModelField:function(modelDef){
		return ArrayUtils.findElementByPropertyName(modelDef.fields,"has_effect");
	}
};