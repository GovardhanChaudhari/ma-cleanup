Template.field_form_basic.created = function(){
    this.isCombo = new ReactiveVar(false);
    console.log("creating field form");
};

Template.field_form_basic.helpers({
    isCombo:function(){
        console.log("checking is combo");
        if(this.type === Data_Type_Combo || this.type === Data_Type_DropDown){
            Template.instance().isCombo.set(true);
        }
        return Template.instance().isCombo.get();
    }
});

Template.combo_fields.helpers({
    isMultiple:function(){
        //debugger;
        var field_form = TemplateHelpers.getParentTemplate(Template.instance(),"field_form_basic");
        return field_form .isCombo.get();
    }
});