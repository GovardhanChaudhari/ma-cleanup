Template.labeled_date.created = FormHelpers.setParentForm;

Template.labeled_date.rendered = function(){
    $('.datepicker').datepicker({
        format:"dd/mm/yyyy"
    });

    var templateInstance = this;
    this.getValue = function(){
        return ComponentHelpers.getComponentValue(templateInstance,templateInstance.data.name);
    };
};

