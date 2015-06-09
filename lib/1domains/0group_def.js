GroupDef = {
	name:"group",
	fields:[
		{name:"name"}
	],
	isBaseModel:true,
	owner:Admin_Email,
	isPublished:false
};

GroupDb = MongoUtils.createModel(GroupDef.name);

GroupDb.blank = function(){
	return { name:"" };
};
