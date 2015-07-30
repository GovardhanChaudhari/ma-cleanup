Template.table_cell_value.helpers({
  value:function(){

  	// here this is {name:"",type:""} object
  	var parentData = Template.parentData(1);
  	var cellValue;
  	if(this.type === Data_Type_Derived){
  		//cellValue = ModelHelpers.getDerivedPropertyValue(parentData,this);
        //debugger;
        cellValue = DateUtils.getDaysRemaining(parentData["expiry_date"]);

  	}else if(this.type === Data_Type_Combo){

		cellValue = parentData[this.name];
	}else{
  		cellValue = parentData[this.name];
	    if(ObjectUtils.isPrimitive(cellValue)){
	    }else{
	    	cellValue = JSON.stringify(cellValue);
	    }	
  	}
    return cellValue;
  },

  showValue:function(){
  	return TemplateHelpers.showValue(this);
  }
});


Template.table_row.helpers({
  fields:function(){
    return ModelHelpers.getCurrentModelFields();
  }
});
