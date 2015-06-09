Template.checkbox.created = TemplateHelpers.setAppParentForm;

Template.checkbox.rendered = function(){
    var templateInstance = this;
    this.getValue = function(){
        // debugger;
        var checkbox = ComponentHelpers.getComponent(templateInstance,templateInstance.data.name);
        value = ComponentHelpers.isCheckBoxChecked(checkbox);
        return value;
    };

    this.getName = function(){
        return templateInstance.data.name;
    }
};

Template.checkbox.helpers({
    value:function(){
        console.log("getting checkbox value");
        return ObjectUtils.stringToBoolean(ComponentHelpers.value.apply(this));
    }
});