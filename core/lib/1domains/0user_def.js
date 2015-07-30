UserDef = {
	name:"user",
	fields:[
		{name:"name"},
		{name:"_id"},
        {name:"meteorUserId"},
		{name:"email"},
		{name:"password",type:Data_Type_Password,hide:true},
		{name:"roles",type:"combo",model_name:"role",display_value:"name"}

	],
    isBaseModel:true,
	owner:Admin_Email,
    isPublished:false
};

UserDb = MongoUtils.createModel(UserDef.name);

if(Meteor.isServer){
    UserDb.find().observe(
        {
            removed:function(user){
                //DBUtils.remove(Meteor.users,user._id);
                console.log("removing user " + user._id);
                //Meteor.call("remove",Meteor.users,user.meteorUserId);
                Meteor.users.remove(user.meteorUserId);
                console.log("removed used : " + user._id);
            }/*,

            added:function(user){
                console.log("creating meteor user with data : " + ObjectUtils.printDetails(user));
                RoleUtils.addUserToRoles(user._id,user.roles);
                UserHelpers.createMeteorUser(user);
            }*/
        }
    );
}



UserDb.blank = function(){
	return { user_name:"" };
};

UserDb.create = function(data){
	//console.log("creating user def using data : " + ObjectUtils.printDetails(data));
    data.name = data.user_name;
	return UserHelpers.createMeteorUser(data);
};

UserDb.updateUser=function(userId,data){
	console.log("updating user with data: " , data);
    var meteorUserId = UserHelpers.getMeteorUserId(userId);
	DBUtils.update(UserDb,userId,data);

    RoleUtils.getRolesByMeteorUserId(meteorUserId,function(roles){
        RoleUtils.removeUserFromRoles(meteorUserId,roles);
        RoleUtils.addUserToRoles(meteorUserId,data.roles);
    });
};