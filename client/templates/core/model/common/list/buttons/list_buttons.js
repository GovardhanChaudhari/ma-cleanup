Template.button_add_model.events({
    'click':function(evt,template){
        Session.set(Editing_Model,false);
        Session.set(Add_Model,true);
        /*var modelFormTemplate = TemplateHelpers.getParentTemplate(template,"modelList");
         TemplateHelpers.showTemplate("model_form",modelFormTemplate);*/
        var currentModel = ModelHelpers.currentModel();
        if(Meteor.Device.isPhone()){
            console.log("this is phone");
        }else{
            RouterHelpers.showNewModelInstanceForm(currentModel._id);
        }

    }
});

Template.button_remove_all.events({
    'click':function(evt,template){
        Meteor.call("removeAll",ModelHelpers.currentModel().name);
    }
});

Template.button_remove_row.events({
    'click' : function(evt,template){
        //TODO if current model is 'models' then also unsubscribe this document collection
        var currentModel = ModelHelpers.currentModel();
        if(currentModel.name === ModelDb_Name){
            // TODO not working
            Meteor.call("removeDb",template.data.name);
            ModelHelpers.unSubscribeModel(template.data.name);
        }

        if(UserHelpers.isAdmin()){
            DBUtils.serverRemoveRecord(currentModel.name,template.data._id);
        }else{
            currentModel.remove({_id:template.data._id});
        }
        //ModelHelpers.unPublishModel(template.data.name);
        //Models_Dep.changed();
    }
});

Template.button_edit_row.events({
    'click':function(evt,template){
        evt.preventDefault();
        Session.set(Editing_Model, template.data._id);
        Session.set(Current_Editing_Model_Data, template.data);
        //debugger;
        Router.go("/models/"+template.data._id +"/" + Form_Mode_Edit);
    }
});