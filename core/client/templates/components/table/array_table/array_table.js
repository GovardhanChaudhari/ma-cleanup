Template.array_table.created = function(){
    this.rows = new ReactiveVar([]);
    this.columns = new ReactiveVar([]);
};

Template.array_table.rendered = function(){
    //console.count("array table render count");
    //debugger;
    var templateInstance = this;
    var tableArrayData = this.data.data;
    if(tableArrayData){
        ArrayUtils.each(tableArrayData,function(obj,index){
            var row = {};
            row["index"] = index;
            row["data"] = obj;
            var rows = templateInstance.rows.get();
            rows.push(row);
            templateInstance.rows.set(rows);
        });


        var fieldsData = FieldHelpers.getFieldNameObjectArrayByFieldArray(tableArrayData);


        var cols = [];
        ArrayUtils.each(fieldsData, function (field) {
            var columnData = {};
            columnData["name"] = field.name;
            cols.push(columnData);
        });
        templateInstance.columns.set(cols);
    }else{
        console.log("data property of array table component is not set, rendering of array table may fail");
    }


};

Template.array_table.helpers({
    rows: function () {
        return Template.instance().rows.get();
    },

    columns:function(){
        //console.log("array table accessed columns");
        return Template.instance().columns.get();
    }

});

Template.array_table_row.helpers({
    columns: function () {
        console.log("array table row accessed columns");
        var parentTemplateInstance = TemplateHelpers.getParentTemplate(Template.instance(),"array_table");
        return parentTemplateInstance.columns.get();
    }
});

Template.array_table_header.helpers({
    name: function () {
        //console.log("table header : ",this.name);
        return this.name;
    }
});

Template.array_table_cell_value.helpers({
    value: function () {
        var tableRow = TemplateHelpers.getParentViewData(Blaze.currentView,"array_table_row");
        //console.log("array table row value : ",tableRow, " context : ", this);
        return tableRow.data[this.name];
    }
});