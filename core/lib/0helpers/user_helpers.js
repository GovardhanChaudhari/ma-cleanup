UserHelpers = {
	createUser: function(data){
		
		var user = UserHelpers.findByEmail(data.email);
		//if (Meteor.users.find({emails:{$elemMatch:{address:data.email}}}).count() === 0){
		// assuming meteor user exist
		if(user){
			//var id = Accounts.createUser(data);
			var exintingUser = ModelHelpers.isModelExist(UserDb,"_id",user._id);
			if(exintingUser){

			}else{
				UserDb.insert({_id:user._id,name:user.profile.name,email:UserHelpers.getEmailByUser(user)});
				Roles.addUsersToRoles(user._id,['webuser']);		
			}
			return user._id;
		}else{
			// meteor user does not exist
			console.log("User does not exist in Meteor.users db, so creating user");
			//var id = Accounts.createUser(data);
            //UserHelpers.createUser(data);
            //return id;
		}
	},

    createMeteorUser:function(data){
        var meteorUser = {};
        meteorUser["username"] = data.name;
        meteorUser["email"] = data.email;
        meteorUser["password"] = data.password;
        meteorUser["profile"] = {name:data.name};

        debugger;
        return Meteor.call("createMeteorUser",meteorUser,function(err,result){
            if(err){
                console.log("failed createMeteorUser:" + err);
            }else{
                return result;
            }
        });
    },

	createUserByMeteorUser:function(meteorUser){
		var roles = [UserConfig.Default_User_Role];
		UserDb.insert({meteorUserId:meteorUser._id,name:meteorUser.profile.name,email:meteorUser.emails[0].address,roles:roles});
		Roles.addUsersToRoles(meteorUser._id,roles);
	},



	createAdmin:function(data){
		UserHelpers.createMeteorUser(data);
        var user = UserHelpers.findByEmail(data.email);
        if(user){
            RoleUtils.addUserToRoles(user._id,['admin']);
            return user._id;
        }
	},

	findByEmail:function(email){
		return Meteor.users.findOne({emails:{$elemMatch:{address:email}}});
	},

	getEmailByUser:function(user){
		return user.emails[0].address;
	},

    isMeteorUserExist:function(email) {
        var existingUserEmail = UserHelpers.findByEmail(email);
        return (existingUserEmail !== null && existingUserEmail !== undefined)
    },

	getMeteorUserId:function(userId){
		var user = UserHelpers.getUserById(userId);
		return user.meteorUserId;
	},

	getUserById:function(userId){
		return UserDb.findOne({_id:userId});
	},

	getMeteorUserById:function(userId){
		return Meteor.users.findOne({_id:userId});
	},

	getMeteorUserRoles:function(userId){
		return UserHelpers.getMeteorUserById(userId).roles;
	},

	getUserIdByMeteorUserId:function(meteorUserId){
		var user = UserDb.findOne({meteorUserId:meteorUserId});
		if(user){
			return user._id;
		}
	},

	getUserByMeteorUserId:function(meteorUserId){
		return UserDb.findOne({meteorUserId:meteorUserId});
	},

	getLoggedInUserId: function () {
		return Meteor.userId();
	},

	isAdmin: function (userId) {
		return RoleUtils.isAdminRole(userId)
	},

	getLoggedInUserEmailId:function(){
		return UserHelpers.getEmailByUser(UserHelpers.getLoggedInUser());
	},

	getLoggedInUser:function(){
		return Meteor.user();
	},

	getAdminUserId: function () {
		var userId = UserHelpers.findByEmail(Admin_Email)._id;
		return userId;
	},

	removeMeteorUser:function(userId){
		DBUtils.allowDeleteOperation(Meteor.users,true);

		DBUtils.remove(Meteor.users,userId);

		DBUtils.allowDeleteOperation(Meteor.users,false);
	}
};