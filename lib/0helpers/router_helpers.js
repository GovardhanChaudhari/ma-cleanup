RouterHelpers={
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

	showNewModelDefFieldForm:function(modelDefId){
		Router.go("/modeldefs/"+modelDefId+"/fields/" + Form_Mode_New);
	},

	/*mobile helpers*/

	mobileShowModelInstanceList:function(modelId){
		Router.go("/mobile/models/" + modelId + "/");
	},

	mobileShowModelDetails:function(modelId,itemId){
		Router.go("/mobile/models/" + modelId + "/details/" + itemId);
	},

	mobileShowNewModelInstanceForm: function (modelDefId) {
		Router.go("/mobile/models/" + modelDefId + "/new");
	},

	mobileShowEditModelInstanceForm: function (modelDefId) {
		Router.go("/mobile/models/" + modelDefId + "/edit");
	}

};