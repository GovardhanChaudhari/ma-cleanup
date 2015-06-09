FormHelpers = {
	clearAllFormStates:function(session){
		session.set(Show_Model_Form,false);
    	session.set(Editing_Model,false);
    	session.set(Add_Model,false);
        session.set(Editing_ModelDefId,null);
	},
	clearFormSate:function(session,property,value){
		value = value || null;
		session.set(property,value);
	},

	populateDerivedFieldData:function(field,form){
		var derivedPropertyNames = Derived_Property_Field_Names;
		_.each(derivedPropertyNames,function(propertyName){
            FormHelpers.populateFieldsFormProperty(form,field,propertyName);
		});
	},

	populateFieldsFormProperty:function(form,field,propertyName){
		var val =$($(form).find("input[id='fields[" + propertyName + "]']")).val();
		if(val){
			field[propertyName] = val;
		}
	},

	getFormArrayData:function(form,propertyName){
		console.log("getting form array data");
		var array_fields = form.findAll("div.array_fields div.array_field");
		console.log("found array fileds : " + array_fields.length);
		var valueArray = ArrayUtils.map(array_fields,function(field){
			//TODO add field name ie array_field[field_name]
			return ComponentHelpers.getComponentValue($(field).find('[id^="array_field"]'));
		});
		return valueArray;
	},

	getSearchFields:function(fields){
		// here fields is an array of input dom elements
	},

	searchAction:function(evt,template){
		data = {};
		var fields = ModelHelpers.getCurrentModelFields();
		_.each(fields,function(field){
			var searchField = $("input[id^=search_" + field.name+  "]");	
			var value = $(searchField).val();
			if(value){
				value = StringUtils.escapeSpecialCharacters(value);
				data[field.name] = {$regex: ".*" + value + ".*",$options:"i"};	
			}
			//$(searchField).val("");
		});
		console.log("search data : " + data);
		ObjectUtils.removeBlankProperties(data);
		Session.set(Search_Data,data);
	},

	setFormGetValueFunction:function(){
		var templateInstance = this;
		this.childComponents = [];
		this.getValue = function(){
			//debugger;
			var formData = {};
			_.each(templateInstance.childComponents,function(childComponent){
				formData[childComponent.getName()] = childComponent.getValue();
			});
			//debugger;
			return formData;
		}
	}
};