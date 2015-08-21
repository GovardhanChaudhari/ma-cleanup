"use strict()";
RouterHelpers={

	goToHomePage:function(){
		Router.go("/");
	},

	showModelList:function(modelId){
		Router.go("/models/" + modelId);	
	},

	showModelInstanceForm:function(modelId,mode){
		Router.go("/models/" + modelId + "/" + mode);
	},

	showNewModelInstanceForm:function(modelId){
		RouterHelpers.showModelInstanceForm(modelId,Form_Mode_New);
	},

	showEditModelInstanceForm:function(modelId){
		RouterHelpers.showModelInstanceForm(modelId,Form_Mode_Edit);
	},

	showModelDefForm:function(modelId,mode){
		Router.go("/modeldefs/" + modelId + "/" + mode);
	},

	showNewModelDefForm:function(modelId){
		RouterHelpers.showModelDefForm(modelId,Form_Mode_New)
	},

	showEditModelDefForm:function(modelId){
		RouterHelpers.showModelDefForm(modelId,Form_Mode_Edit)
	},

	showEditModelDefFieldForm:function(modelDefId,fieldIndex){
		Router.go("/modeldefs/"+modelDefId+"/fields/"+fieldIndex+"/" + Form_Mode_Edit);
	},

	showEditModelDefAdvancedFieldForm:function(modelDefId,fieldIndex){
		Router.go("/modeldefs/"+modelDefId+"/fields/"+fieldIndex+"/advanced/" + Form_Mode_Edit);
	},

	showModelDefFieldForm:function(modelDefId,mode){
		Router.go("/modeldefs/"+modelDefId+"/fields/" + mode);
	},

	showNewModelDefFieldForm:function(modelDefId){
		RouterHelpers.showModelDefFieldForm(modelDefId,Form_Mode_New);
	},

	getParamValue:function(paramName){
		return Router.current().params[paramName];
	},

	getCurrentProcessingModelId:function(){
		return RouterHelpers.getParamValue("_id");
	}
};