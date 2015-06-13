Template.labeled_date.created = TemplateHelpers.setParentForm;

Template.labeled_date.rendered = function(){
    $('.datepicker').datepicker({
        format:"dd/mm/yyyy"
    });

    var templateInstance = this;
    this.getValue = function(){
        return ComponentHelpers.getComponentValue(templateInstance,templateInstance.data.name);
    };
};

