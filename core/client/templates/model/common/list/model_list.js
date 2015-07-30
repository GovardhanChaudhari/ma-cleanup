Template.modelList.helpers({
    models: function () {
        var foundModels;
        //console.log("tracking models **************" + this);
        var searchData = Session.get(Search_Data);
        searchData = searchData || {};

        if(this.model_name){
            var featuredModel = ModelHelpers.getFeaturedModel(this.model_name);
            foundModels = featuredModel.getModelList(searchData);
        }else{
            foundModels = ModelHelpers.currentModel().getModelList(searchData);
        }
        return foundModels;
    },

    fields: function () {
        return ModelHelpers.getCurrentModelFields({includeHidden: false});
    },

    currentModel: function () {
        return ModelHelpers.currentModel();
    },

    showTableOperation: function () {
        //debugger;
        var modelDef = ModelDefHelpers.getModelDefByName(ModelHelpers.currentModel().name);
        return ObjectUtils.stringToBoolean(modelDef.showTableOperation);
    }

});

Template.modelList.events({
    'click .removeAll': function (evt, tmpl) {
        Meteor.call("removeAllProducts");
    }
});


Template.table_header.helpers({
    showHeader: function () {
        return TemplateHelpers.showValue(this);
    }
});

Template.table_operation_value.helpers({
    value: function () {
        if (this.operation && this.operation === "sum") {
            //debugger;
            var searchData = Session.get(Search_Data);
            searchData = searchData || {};
            var foundModels = ModelHelpers.currentModel().getModelList(searchData);

            return ArrayUtils.sum(foundModels, this.name, this.type);
        }else{
            return "";
        }
    }
});