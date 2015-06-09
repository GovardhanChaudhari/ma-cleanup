ArrayUtils.each(Single_Valued_Templates, function (templateName) {
    Template[templateName].helpers(ComponentHelpers.value());
});

ArrayUtils.each(App_Components,function(templateName){
    Template[templateName].created = TemplateHelpers.setAppParentForm;
    Template[templateName].rendered = TemplateHelpers.simpleAppGetValue;
});