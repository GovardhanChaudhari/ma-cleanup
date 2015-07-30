Meteor_Helpers = {
    call: function (name,args) {
        Meteor.call(name,args, function (err,result) {
            if(err){
                console.log("Error: method : ", name, " desc: " ,err);
            }
        });
    }
};
