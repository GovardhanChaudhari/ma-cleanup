Template.registerHelper("isPhoneOrTablet",function(){
	return MobileUtils.isPhoneOrTablet();
});

Template.registerHelper("modelName",function(){
	var modelName = ModelDefHelpers.getCurrentModelName() ||  ModelDb_Name;
	return modelName;
});

Template.registerHelper("capitalize",function(str){
	return StringUtils.capitalize(str);
});

Template.registerHelper("currentYear",function(){
	return DateUtils.getCurrentYear();
});


Template.registerHelper("isModelDef",function(){
	//debugger;
	return ModelDefHelpers.isModelDefinition(ModelDefHelpers.getCurrentModelName());
});


Template.registerHelper("getMeteorRelease",function(){
    return MeteorUtils.getMeteorRelease();
});

Template.registerHelper("getMeteorVersion",function(){
    return MeteorUtils.getMeteorVersion()
});

Template.registerHelper("canRead",function(){
	return RoleUtils.canRead();
});

Template.registerHelper("canInsert",function(){
	return RoleUtils.canInsert();
});

Template.registerHelper("canUpdate",function(){
	return RoleUtils.canUpdate();
});

Template.registerHelper("canDelete",function(){
	return RoleUtils.canDelete();
});

Template.registerHelper("isAdminRole",function(){
	return RoleUtils.isAdminRole();
});