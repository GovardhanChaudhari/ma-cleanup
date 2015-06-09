Template.search.helpers({
	name:function(){
		return "search_" + Template.instance().data.name;
	},

	placeHolder:function(){
		return "Enter " + Template.instance().data.name + " to search";
	},
	
	showValue:function(){
		return TemplateHelpers.showValue(this);
	}
});

Template.search.events({
	'keyup':function(evt,template){
		FormHelpers.searchAction(evt,template);
	}	
});