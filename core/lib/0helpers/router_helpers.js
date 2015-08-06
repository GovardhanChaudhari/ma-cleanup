RouterHelpers={

	goToHomePage:function(){
		Router.go("/");
	},

	goEditModelDefs:function(modelId){
		Router.go("/modeldefs/" + modelId + "/" + Form_Mode_Edit);
	},

	showModelList:function(modelId){
		Router.go("/models/" + modelId);	
	},

	showNewModelInstanceForm:function(modelId){
		Router.go("/models/" + modelId + "/" + Form_Mode_New);
	},

	showNewModelDefForm:function(modelId){
		RouterHelpers.showModelDefForm(modelId,Form_Mode_New)
	},

	showEditModelDefForm:function(modelId){
		RouterHelpers.showModelDefForm(modelId,Form_Mode_Edit)
	},

	showModelDefForm:function(modelId,mode){
		Router.go("/modeldefs/" + modelId + "/" + mode);	
	},

	showEditModelDefFieldForm:function(modelDefId,fieldIndex){
		Router.go("/modeldefs/"+modelDefId+"/fields/"+fieldIndex+"/" + Form_Mode_Edit);
	},

	showEditModelDefAdvancedFieldForm:function(modelDefId,fieldIndex){
		Router.go("/modeldefs/"+modelDefId+"/fields/"+fieldIndex+"/advanced/" + Form_Mode_Edit);
	},

	showNewModelDefFieldForm:function(modelDefId){
		Router.go("/modeldefs/"+modelDefId+"/fields/" + Form_Mode_New);
	},

	getParamValue:function(paramName){
		return Router.current().params[paramName];
	},

	getCurrentProcessingModelId:function(){
		return RouterHelpers.getParamValue("_id");
	}
};