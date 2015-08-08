Template.model_instance_list_phone.helpers({
    /*name:function(){
        console.log("name: ", this.name);
        return this.name;
    }*/

    items:function(){
        return ModelDefHelpers.currentModel().getModelList();
    }
});
