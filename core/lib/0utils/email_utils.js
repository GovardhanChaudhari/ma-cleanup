EmailUtils = {
    sendEmail:function(options){
        Email.send(options);
    },

    serverSendEmail:function(options){
        Meteor_Helpers.call("sendEmail",options);
    }
};
