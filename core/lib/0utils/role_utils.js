RoleUtils = {
	create:function(name){

	},

    createAdminRole:function(){
        var roleData = {name:Role_Admin};
        roleData = ObjectUtils.merge(roleData,RoleUtils.getAdminPermissions());
        DBUtils.insertIfNotFound(RoleDb,{name:Role_Admin},roleData);
    },

    getAdminPermissions: function () {
        return {read:true,insert:true,update:true,delete:true};
    },

    createUserRole:function(){
        DBUtils.insertIfNotFound(RoleDb,{name:Role_User},{name:Role_User,read:true,insert:true,update:true,delete:"false"});
    },

    createWebMasterRole:function(){
        DBUtils.insertIfNotFound(RoleDb,{name:Role_WebMaster},{name:Role_WebMaster,read:true,insert:true,update:true,delete:"true"});
    },

    addUserToRoles:function(userId,roles){
        Meteor.call("addUserToRoles",userId,roles);
    },

    removeUserFromRoles:function(userId,roles){
        Meteor.call("removeUserFromRoles",userId,roles);
    },

    getLoggedInUserRoles:function(userId){
        debugger;
        if(userId){
            return Roles.getRolesForUser(userId);
        }else{
            return Roles.getRolesForUser(Meteor.userId());
        }
    },

    getRolesByMeteorUserId:function(meteorUserId,func){
        Meteor.call("getRolesByMeteorUserId",meteorUserId,function(err,result){
            func(result);
        });
    },

    isAdminRole:function(userId){
        /*return Meteor.call("isUserInRoles",UserHelpers.getLoggedInUserId(),"admin",function(err,result){
            console.log("isAdmin : ",result);
            return result;
        });*/

        userId = userId || UserHelpers.getLoggedInUserId();
        return Roles.userIsInRole(userId,Role_Admin);

    },

    getRoleInstanceByName:function(role){
        return RoleDb.findOne({name:role});
    },

    getRoleInstance:function(userId){
        var roles = RoleUtils.getLoggedInUserRoles(userId);
        //assuming that user has a single role
        var roleInstance = RoleUtils.getRoleInstanceByName(roles[0]);
        return roleInstance;
    },

    getPermissionByName:function(permissionName,userId){
        var roleInstance = RoleUtils.getRoleInstance(userId);
        return roleInstance[permissionName];
    },

    canRead:function(userId){
        return ObjectUtils.stringToBoolean(RoleUtils.getPermissionByName(PERMISSION_READ,userId));
    },
    canInsert:function(userId){
        return ObjectUtils.stringToBoolean(RoleUtils.getPermissionByName(PERMISSION_INSERT,userId));
    },

    canUpdate:function(userId){
        return ObjectUtils.stringToBoolean(RoleUtils.getPermissionByName(PERMISSION_UPDATE,userId));
    },

    canDelete: function (userId) {
        return ObjectUtils.stringToBoolean(RoleUtils.getPermissionByName(PERMISSION_DELETE,userId));
    },

    resetAdminUserRole: function () {
        var adminUserId = UserHelpers.getAdminUserId();
        RoleUtils.getRolesByMeteorUserId(adminUserId, function (roles) {
            RoleUtils.removeUserFromRoles(adminUserId,roles);
        });
        RoleUtils.addUserToRoles(adminUserId,Role_Admin);
    }
};