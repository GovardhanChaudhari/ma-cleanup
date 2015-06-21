Template.model_details_row.helpers({
    fieldName:function(){
        return this.name;
    },

    fieldValue:function(){
        var itemInstance = TemplateHelpers.getParentViewData(Blaze.currentView,"model_instance_details_phone");
        // here this refers to field
        return itemInstance[this.name];
    },

    showValue: function () {
        return TemplateHelpers.showValue(this);
    }

});