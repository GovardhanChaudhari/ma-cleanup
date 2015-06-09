/**
 * Created by gvc on 13-05-2015.
 */
Meteor.methods({
    createMeteorUser:function(userData){
        debugger;
        return Accounts.createUser(userData);
    },

    addUserToRoles:function(userId,roles){
        console.log("adding user ",userId, "to roles : ",roles);
        Roles.addUsersToRoles(userId,roles);
    },

    removeUserFromRoles:function(userId,roles){
        Roles.removeUsersFromRoles(userId,roles);
    },

    getRolesByMeteorUserId:function(meteorUserId){
        return Roles.getRolesForUser(meteorUserId);
    },

    isUserInRoles:function(meteorUserId,roles){
        return Roles.userIsInRole(meteorUserId,roles);
    },

    resetAdminUser:function(){
        var adminUserId = UserHelpers.getAdminUserId();
        var adminUserDefaultData = System_Defaults_Helpers.getAdminUserDefaults();
        if(adminUserId){
            RoleUtils.resetAdminUserRole();
            var userId = UserHelpers.getUserIdByMeteorUserId(adminUserId);
            adminUserDefaultData["meteorUserId"] = adminUserId;
            if(userId){
                DBUtils.update(UserDb,userId,adminUserDefaultData);
            }else{
                DBUtils.insert(UserDb,adminUserDefaultData);
            }
        }else{
            //TODO
        }
    }

});