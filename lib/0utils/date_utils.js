DateUtils = {
	getCurrentYear:function(){
		return ((new Date().getYear()) + 1900);
	},

    getDaysRemaining:function(dateString){
        // here date string is in format mm/dd/yyyy
        return Math.ceil((DateUtils.parse(dateString) - new Date())/(1000*60*60*24));
    },

    // parse a date in mm/dd/yyyy format
    parse:function(input) {
        var parts = input.split('/');
        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[2], parts[0]-1, parts[1]); // Note: months are 0-based
    }
};