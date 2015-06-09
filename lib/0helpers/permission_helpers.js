PermissionHelpers={
    checkDefaultUserPermissions:function(collection,userId,operationName){
        return UserHelpers.isAdmin(userId) || (collection.ownerId === userId && PermissionHelpers.canPerformOperation(operationName,userId));
    },

    canPerformOperation:function(operationName,userId){
        var operation;
        switch (operationName){
            case PERMISSION_READ:
                operation =  RoleUtils.canRead;
                break;
            case PERMISSION_INSERT:
                operation =  RoleUtils.canInsert;
                break;
            case PERMISSION_UPDATE:
                operation =  RoleUtils.canUpdate;
                break;
            case PERMISSION_DELETE:
                operation =  RoleUtils.canDelete;
                break;
            default :
                throw new Error("Invalid operation: " + operationName);
        }
        return operation(userId);
    }
};
