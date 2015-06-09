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


        Found_Models = foundModels;
        //Models_Dep.depend();
        //Session.set("search_data",null);
        //var totalRecordTemplate = TemplateHelpers.getParentTemplate(Template.instance(),"total_records");
        //console.log("found total record template " + totalRecordTemplate);
        try {
            Session.set(Total_Records, Found_Models.length);
            var sum = ArrayUtils.sum(Found_Models, "selling_price", "int");
            Session.set(Total_Sum, sum);
            //this.totalRecords = Found_Models.length;
            //Template.instance().data.totalRecords = Found_Models.length;
        } catch (e) {
            //this.totalRecords = 0;
            Session.set(Total_Records, 0);
        }
        return Found_Models;
    },

    fields: function () {
        return ModelHelpers.getCurrentModelFields({includeHidden: false});
    },

    function_field_name: function () {
        return "function_" + this.name;
    },

    currentModel: function () {
        return ModelHelpers.currentModel();
    },

    totalRecords: function () {
        return Session.get(Total_Records);
    },

    sum: function () {
        return Session.get(Total_Sum);
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