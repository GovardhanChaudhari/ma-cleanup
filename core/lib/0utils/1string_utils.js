StringUtils = {
	capitalize:function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	escapeSpecialCharacters:function(str){
		return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	},

	removeAllWhiteSpaces: function (str) {
		return str.replace(/\s+/g, '');
	},

	startsWith: function (str,startWithString) {
		return str.indexOf(startWithString) == 0;
	},

	prefix:function(prefixString,mainString,separator){
		var resultString = prefixString;
		if(separator){
			resultString = resultString + separator + mainString;
		}else{
			resultString = resultString + mainString;
		}
		return resultString;
	}
};