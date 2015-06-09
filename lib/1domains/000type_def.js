TypeDef = {
	name:"type",
	fields:[
		{name:"name"}
	],
	isBaseModel:true,
	owner:Admin_Email,
	isPublished:false
};

TypeDb = MongoUtils.createModel(TypeDef.name);

if(Meteor.isServer){
	ArrayUtils.each(Object.keys(Template_Map),function(type){
		DBUtils.insertIfNotExist(TypeDb,{name:type});
	});
}

TypeDb.blank = function(){
	return { name:"" };
};

