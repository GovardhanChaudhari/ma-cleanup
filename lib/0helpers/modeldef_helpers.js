ModelDefHelpers={
	getEditingModelDef:function(){
		return ModelDefHelpers.getModelDefById(ModelDefHelpers.getEditingModelDefId());
	},
	
	getAllModelDefs:function(){
		return ModelDefDb.find().fetch();
	},

	getModelDefByName:function(name){
		return ModelDefDb.findOne({name:name});
	},

	isModelDefinition:function(name){
		return (name === ModelDb_Name);
	},

	getModelDefById:function(id){
		var modelDef = ModelDefDb.findOne({_id:id});
		//debugger;
		return modelDef;
	},

	// meteor userId is optional
	getCustomeModelDefs:function(meteorUserId){
		if(meteorUserId){
			var userId = UserHelpers.getUserIdByMeteorUserId(meteorUserId);
			return ModelDefDb.find({name:{$nin:Base_Models},ownerId:userId,isBaseModel:"false"}).fetch();
		}else{
			return ModelDefDb.find({name:{$nin:Base_Models},isBaseModel:"false"}).fetch();
		}

	},

	getBaseModelDefs:function(){
		//return ModelDefDb.find({name:{$in:Base_Models},isBaseModel:"true"}).fetch();
		return ModelDefDb.find({isBaseModel:"true"}).fetch();
	},

	addModelDef:function(modelDef){
		if(!ModelDefDb.findOne({name:modelDef.name})){
			ModelDefDb.insert(modelDef);
		}
	},

	// assuming model definition has only one affected model field
	getAffectedModelField:function(modelDef){
		return ArrayUtils.findElementByPropertyName(modelDef.fields,"has_effect");
	},

	hasModelDefs:function(){
		return ModelDefDb.find().count() !== 0;
	},

	getEditingModelDefId:function(){
		return Session.get(Editing_ModelDefId)
	},

	getModelDefFields:function(name){
		return ModelDefHelpers.getModelDefByName(name).fields;
	}
};