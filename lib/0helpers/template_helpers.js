TemplateHelpers = {

	getTemplateName:function(type){
		type = type || 'string';
		return Template_Map[type];
	},

	__getDomainValue:function(domain,session,session_property,domain_field){
		var domainVal;
		if(session.get(Add_Model)){
			return '';
		}else{
			domainVal = domain.findOne(session.get(session_property))[domain_field];
			//alert("found domain value : " + domainVal);
			return domainVal;
		}
	},

	modelValue:function(fieldName){
		return TemplateHelpers.__getDomainValue(ModelHelpers.currentModel(),Session,Editing_Model,fieldName);
	},

	getModelValueByDataContext:function(templateDataContext){
		var value = templateDataContext[templateDataContext.name && templateDataContext.name !== "name"];
		if(value && ModelHelpers.currentModel().name !== ModelDb_Name){
			// model value is present in the template context, so no need to access db
			return value;
		}else{
			return  TemplateHelpers.modelValue(templateDataContext.name);
		}
	},

	removeTemplate:function(tmpl){
		Blaze.remove(tmpl.view);
	},

	showTemplate:function(templateName,template){
		//TODO what would be the parent node of template to which it is shown,
		// currently it is last node of given template
		TemplateHelpers.showTemplateAt(templateName,template.lastNode);
	},

	showTemplateWithData:function(templateName,template,data){
		TemplateHelpers.showTemplateAtWithData(templateName,template.firstNode,data);
	},

	showTemplateAt:function(templateName,parentDomNode,parentTemplate){
		if(parentTemplate){
			Blaze.render(Template[templateName],parentDomNode,null,parentTemplate.view);
		}else{
			Blaze.render(Template[templateName],parentDomNode);	
		}
		
	},

	showTemplateAtWithData:function(templateName,parentDomNode,data,parentTemplate){
		//debugger;
		if(parentTemplate){
			Blaze.renderWithData(Template[templateName],data,parentDomNode,null,parentTemplate.view);	
		}else{
			Blaze.renderWithData(Template[templateName],data,parentDomNode);	
		}
		
	},

	getParentTemplate:function(template,templateName){
		return TemplateHelpers.getParentView(template,templateName).templateInstance();
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

	getImmediateParentView:function(view){
		var parentView = view.parentView;
		if(parentView && !StringUtils.startsWith(parentView.name,"Template.__") && !StringUtils.startsWith(parentView.name,"Template.my_dynamic_template") && StringUtils.startsWith(parentView.name,"Template.")){
			return parentView;
		}else{
			return TemplateHelpers.getImmediateParentView(parentView);
		}
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

	getParentViewData:function(view,viewName){
		var view = TemplateHelpers.getParentViewByName(view,viewName);
		if(view && view.templateInstance && view.templateInstance().data){
			return view.templateInstance().data;
		}
	},

	getImmediateParentViewData:function(view){
		var view = TemplateHelpers.getImmediateParentView(view);
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

	getTemplateContextForArrayField:function(existingContext,index){
		var fieldData = {name:existingContext.field.name,array_type:existingContext.field.array_type,index:index};
		if(existingContext.field.array_type === "combo"){
			fieldData = ObjectUtils.merge(fieldData,{model_name:existingContext.field.model_name,display_value:existingContext.field.display_value});
			if(existingContext.field.option_value){
				fieldData['option_value'] =  existingContext.field.option_value;
			}			
		}
		return fieldData;
	},

    // this function is assigned to created function of template instance to store reference
    // of this template instance to parent form
    setParentForm:function(){
        //TODO:confirm this will work
        // here this should refer to template instance
        var templateInstance = this;

        templateInstance.getName = function(){
            return templateInstance.data.name;
        };

        //debugger;
		var form = TemplateHelpers.getParentFormTemplate(templateInstance);
        form.childComponents.push(templateInstance);
    },

	// this function is assigned to created function of template instance to store reference
	// of this template instance to parent form
	setAppParentForm:function(){
		//TODO:confirm this will work
		// here this should refer to template instance
		var templateInstance = this;

		templateInstance.getName = function(){
			return templateInstance.data.name;
		};

		//debugger;
		var form = TemplateHelpers.getParentFormTemplate(templateInstance);
		form.childComponents.push(templateInstance);
	},

	getParentFormData:function(templateInstance){
		var parentTemplate = TemplateHelpers.getParentFormTemplate(templateInstance);
		return parentTemplate.data;
	},

    getParentForm:function(templateInstance){
        var view = templateInstance.view.parentView;
        //TODO: consider all generic templates such as if,with,etc.
        if(view.name === "with"){
            view = view.parentView;
        }
        return view.templateInstance();
    },

	simpleRendered:function(){
		var templateInstance = this;
		this.getValue = function(){
			//debugger;
			return ComponentHelpers.getComponentValue(templateInstance,templateInstance.data.name);
		};
	},

	simpleAppGetValue:function(){
		var templateInstance = this;
		this.getValue = function(){
			//debugger;
			console.log("gettting simple app value for template ", templateInstance.view.name);
			return ComponentHelpers.getComponentValue(templateInstance,templateInstance.data.name);
		};

		this.getName = function(){
			return templateInstance.data.name;
		}
	},

	setAppFormGetValueFunction:function(){
		var templateInstance = this;
		this.childComponents = [];
		this.getValue = function() {
			//debugger;
			var formData = {};
			_.each(templateInstance.childComponents, function (childComponent) {
				formData[childComponent.getName()] = childComponent.getValue();
			});
			//debugger;
			return formData;
		}
	}
};