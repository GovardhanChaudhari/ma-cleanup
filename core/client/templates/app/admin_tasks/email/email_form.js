Template.email_form.created = FormHelpers.setFormGetValueFunction;
Template.email_form.events({
    'click .send_email':function(evt,template){
        console.log("sending email");
        var emailData = template.getValue();
        EmailUtils.serverSendEmail(emailData);
    }
});
