WebUtils = {
    crwall:function(){

    },

    get:function(url,options,callback){
        return Meteor.call("httpGet",url,options,function(err,result){
            return callback(err,result);
        });
    }
};
