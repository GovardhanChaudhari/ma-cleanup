Template.button_cancel_upload_file.events({
    'click':function(evt,template){
        evt.preventDefault();
        var uploadForm = TemplateHelpers.getParentTemplate(template,"file_upload_form");
        TemplateHelpers.removeTemplate(uploadForm);
    }
});


//Template.button_upload_file.events(fileUploadEvent);


// add following event to the file_upload_form in button click event
var fileUploadEvent = {
    'submit form':function(evt,template){
        console.log("uploading file ...");
        evt.preventDefault();
        var file = template.find('#fileInput').files[0];

        var reader = new FileReader();
        reader.onload = function(e){
            var data_url = e.target.result;
            var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
            var ext = matches[1];
            var base64_data = matches[2];

            /*Meteor.call('base64ToString',base64_data,function(err,result){
             var obj =  Meteor.call('importCsv',ModelHelpers.currentModel().name,result);
             console.log("import csv result " + obj);

             });*/

        };
        reader.readAsDataURL(file);

        TemplateHelpers.removeTemplate(template);
        console.log(file);
    }
};

