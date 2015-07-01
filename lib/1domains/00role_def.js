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


if(Meteor.isClient){
	Meteor.subscribe(RoleDef.name);
}

RoleDb.blank = function(){
	return { name:"" };
};
