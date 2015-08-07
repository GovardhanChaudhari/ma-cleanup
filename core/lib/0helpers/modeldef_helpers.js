ModelDefHelpers={
	getEditingModelDefId:function(){
		return Session.get(Editing_ModelDefId)
	},

	getEditingModelDef:function(){
		return ModelDefHelpers.getModelDefById(ModelDefHelpers.getEditingModelDefId());
	},
	
	getAllModelDefs:function(){
		return ModelDefDb.find().fetch();
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

	isModelDefinition:function(name){
		return (name === ModelDb_Name);
	},

	// meteor userId is optional
	getCustomeModelDefs:function(meteorUserId){
		if(meteorUserId){
			return ModelDefDb.find({name:{$nin:Base_Models},ownerId:meteorUserId,isBaseModel:"false"}).fetch();
		}else{
			return ModelDefDb.find({name:{$nin:Base_Models},isBaseModel:"false"}).fetch();
		}
	},

	getBaseModelDefs:function(){
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

	getCurrentModelDefId:function(){
		return ModelHelpers.currentModel()._id;
	}
};