Template.database_tasks.events({
    'click .reset_model_def':function(evt,template){
        console.log("clicked reset model def");
        Meteor.call("resetModelDefs",function(err,result){
            if(err){
                console.log("Error: resetModelDefs : " ,err);
            }
        });
    },

    'click .reset_admin_user':function(evt,template){
        console.log("clicked reset admin user");
        Meteor.call("resetAdminUser",function(err,result){
            if(err){
                console.log("Error: resetAdminUser : " ,err);
            }
        });
    },

    'click .reset_admin_roles':function(evt,template){
        var adminRole = RoleDb.findOne({name:Role_Admin});
        adminRole = ObjectUtils.merge(adminRole,RoleUtils.getAdminPermissions());
        DBUtils.update(RoleDb,adminRole._id,adminRole);
    }
});
