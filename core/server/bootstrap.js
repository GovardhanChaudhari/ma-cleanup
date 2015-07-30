Meteor.startup(function(){
	console.log("initing server bootstrap");
	console.log("found model defs: "+ ModelDefDb.find().count());

	UserHelpers.createAdmin({
		email:Owner,
		password:adminPassword,
		name:"gvc"
	});

	RoleUtils.createAdminRole();
	RoleUtils.createUserRole();
	RoleUtils.createWebMasterRole();
	/*UserHelpers.createUser({
		email:"b@b.com",
		password:userPassword,
		profile:{name:"gvc"}
	});*/

	console.log("********End of server startup ***************");
});
