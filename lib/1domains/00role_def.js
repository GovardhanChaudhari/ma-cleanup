RoleDef = {
	name:"role",
	fields:[
		{name:"name"}
	],
	isBaseModel:true,
	owner:Admin_Email,
	isPublished:false
};

RoleDb = MongoUtils.createModel(RoleDef.name);

RoleDb.blank = function(){
	return { name:"" };
};
