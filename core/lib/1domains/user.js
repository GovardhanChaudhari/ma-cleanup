UserConfig = {
    Default_User_Role:"user"
};

if(Meteor.isServer){
    Accounts.onLogin(function(){
        console.log("Accounts.onLogin: Login successfull***********");

        //if(!ModelDef.isPublished){
            var models = ModelDefDb.find().fetch();
            ArrayUtils.each(models,function(model){
                if(model.name !== ModelDb_Name){
                    ModelHelpers.publishModel(model.name);
                }
            });
            ModelDef.isPublished = true;
        //}

    });
}

if(Meteor.isServer){
	Accounts.onCreateUser(function(options,user){
        console.log("called Accounts.oncreateuser : *******************");
        var meteorUserEmail = UserHelpers.getEmailByUser(user);

        if(UserHelpers.isMeteorUserExist(meteorUserEmail)){
            console.log("meteor user already exists : " + meteorUserEmail + " skipping meteor user creation ***************************");

            if(options.profile){
                user.profile = options.profile;
            }

            if(!user.profile){
                user.profile={};
            }

            if(!user.profile.name){
                user.profile.name = meteorUserEmail;
            }

            return user;
        }else{
            console.log("Accounts.oncreateuser : creating meteor user *******************");
            if(options.profile){
                user.profile = options.profile;
            }

            if(!user.profile){
                user.profile={};
            }

            if(!user.profile.name){
                user.profile.name = meteorUserEmail;
            }

            Meteor.setTimeout(function () {
                RoleUtils.addUserToRoles(user._id,Role_User);
            },0);

            UserHelpers.createUserByMeteorUser(user);
            return user;
        }
	});
}

if(Meteor.isClient){
    Accounts.onLogin(function(){
        console.log("client: called onLogin");
        RouterHelpers.goToHomePage();
    });
}