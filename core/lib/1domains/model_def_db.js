console.log("initing model def");

// model def form component names
MDF_Name="name";
MDF_Fields="fields";
MDF_AutoFormFields="autoFormFields";
MDF_OwnerId = "ownerId";
MDF_ShowTableOperation = "showTableOperation";
MDF_IsBaseModel="isBaseModel";
MDF_IsPublished="isPublished";
MDF_SummaryPropertyName="summaryProperty";
MDF_Validations="validations";

ModelDef = {
	name:ModelDb_Name,
	fields:[
		{name:MDF_Name,type:Data_Type_String},
		{name:MDF_AutoFormFields,type:Data_Type_Field},
		{name:MDF_Fields,type:Data_Type_Field},
		{name:MDF_OwnerId,type:Data_Type_Combo,model_name:"user",display_value:"user_name",option_value:"_id"},
        {name:MDF_ShowTableOperation,type:Data_Type_Boolean},
		{name:MDF_IsBaseModel,type:Data_Type_Boolean},
		{name:MDF_SummaryPropertyName,type:Data_Type_String}
	],
	owner:Admin_Email,
	isBaseModel:true,
	isPublished:false
};

ModelDef.getModelList=function(){
	return ModelDefDb.find();
};

if(Meteor.isClient){
	Meteor.subscribe(ModelDb_Name);
}

ModelDefDb = MongoUtils.createModel(ModelDef.name);

if(Meteor.isServer){

	//ModelDefDb.remove({});
	ModelDefHelpers.addModelDef(ModelDef);
	ModelDefHelpers.addModelDef(TypeDef);
	ModelDefHelpers.addModelDef(UserDef);
	ModelDefHelpers.addModelDef(RoleDef);
	ModelDefHelpers.addModelDef(GroupDef);
	ModelDefHelpers.addModelDef(AppFeatureDef);
	ModelDefHelpers.addModelDef(LogDBDef);

	ModelHelpers.publishModel(ModelDb_Name);
}
console.log("******************************");