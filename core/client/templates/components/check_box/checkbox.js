Template.labeled_checkbox.created = FormHelpers.setParentForm;

Template.labeled_checkbox.rendered = function(){
    var templateInstance = this;
    this.getValue = function(){
        // debugger;
        value = ComponentHelpers.getCheckBoxComponentValue(templateInstance,templateInstance.data.name);
        return value;
    };

    this.getName = function(){
        return templateInstance.data.name;
    }
};

Template.checkbox.helpers({
    value:function(){
        //console.log("getting checkbox value");
        return ObjectUtils.stringToBoolean(ComponentHelpers.value.apply(this));
    }
});

Template.labeled_checkbox.helpers({
    value:function(){
        //console.log("getting checkbox value");
        return ObjectUtils.stringToBoolean(ComponentHelpers.value.apply(this));
    },
    label:function(){
        return this.label;
    }
});