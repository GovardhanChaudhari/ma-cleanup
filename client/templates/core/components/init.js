ArrayUtils.each(Single_Valued_Templates, function (templateName) {
    Template[templateName].helpers(ComponentHelpers.getComponentValueHelper());
});

ArrayUtils.each(App_Components,function(templateName){
    Template[templateName].created = TemplateHelpers.setParentForm;
    Template[templateName].rendered = TemplateHelpers.getValue;
});
