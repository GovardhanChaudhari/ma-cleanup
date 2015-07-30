TemplateHelpers = {

	getTemplateName:function(type){
		type = type || 'string';
		return Template_Map[type];
	},

	getParentViewByName:function(view,viewName){
		//console.log("finding parend view by name");
		var parentView = view.parentView;
		if(parentView && parentView.name === "Template." + viewName){
			return parentView;
		}else{
			return TemplateHelpers.getParentViewByName(parentView,viewName);
		}
	},

	getParentView:function(template,viewName){
		//console.log("finding parend view");
		var parentView = template.view;
		return TemplateHelpers.getParentViewByName(parentView,viewName);
	},

	getParentTemplate:function(template,templateName){
		return TemplateHelpers.getParentView(template,templateName).templateInstance();
	},

	getImmediateParentView:function(view){
		var parentView = view.parentView;
		if(parentView && !StringUtils.startsWith(parentView.name,"Template.__") && !StringUtils.startsWith(parentView.name,"Template.my_dynamic_template") && StringUtils.startsWith(parentView.name,"Template.")){
			return parentView;
		}else{
			return TemplateHelpers.getImmediateParentView(parentView);
		}
	},

	getImmediateParentTemplate:function(template){
		var view = TemplateHelpers.getImmediateParentView(template.view);
		var templateInstance = view.templateInstance();
		return templateInstance ;
	},

	getParentFormTemplate:function(template){
		if(template.data && template.data.parent_form){
			return TemplateHelpers.getParentTemplate(template,template.data.parent_form);
		}else{
			var templateInstance = TemplateHelpers.getImmediateParentTemplate(template);
			return TemplateHelpers.getParentFormTemplate(templateInstance);
		}
	},

	getParentViewData:function(view,viewName){
		var view = TemplateHelpers.getParentViewByName(view,viewName);
		if(view && view.templateInstance && view.templateInstance().data){
			return view.templateInstance().data;
		}
	},

	showValue:function(data){
		var showHeader = true;
	    if (_.isUndefined(data.hide) === false && data.hide === true){
	      return false;
	    }
	    return showHeader;
	},

	getParentFormData:function(templateInstance){
		var parentTemplate = TemplateHelpers.getParentFormTemplate(templateInstance);
		return parentTemplate.data;
	},

	getValue:function(){
		var templateInstance = this;
		var fieldName = templateInstance.data.name;
		templateInstance.getValue = function(){
			//debugger;
			//console.log("gettting simple app value for template ", templateInstance.view.name);
			return ComponentHelpers.getComponentValue(templateInstance,fieldName);
		};

		templateInstance.getName = function(){
			return fieldName;
		}
	}
};