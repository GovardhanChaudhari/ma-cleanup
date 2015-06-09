Template.button_import.events({
    'click':function(evt,template){
        debugger;
        console.log("importing from csv");
        var modelFormTemplate = TemplateHelpers.getParentTemplate(template,"modelList");

        var importCSVEvent = {
            'submit form':function(evt,template){
                debugger;
                console.log("uploading file ...");
                //evt.preventDefault();
                var file = template.find('#fileInput').files[0];
                var primaryKey = ComponentHelpers.getInputValueByName(template,"primaryKey");
                if(primaryKey && primaryKey === "-"){
                }else{
                    console.log("no primary key specified using default as 'name'");
                    primaryKey = "name";
                }

                var reader = new FileReader();
                reader.onload = function(e){
                    var data_url = e.target.result;
                    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
                    var ext = matches[1];
                    var base64_data = matches[2];

                    Meteor.call('base64ToString',base64_data,function(err,result){
                        if(err){
                            debugger;
                            console.log("failed to convert base64 to string, err : " + err);
                        }else{
                            var obj =  Meteor.call('importCsv',ModelHelpers.currentModel().name,primaryKey,result);
                            debugger;
                            console.log("import csv result: " , obj);
                        }

                    });
                };
                reader.readAsDataURL(file);

                TemplateHelpers.removeTemplate(template);
                console.log(file);
            }
        };
        Template.file_upload_form.events(importCSVEvent);
        TemplateHelpers.showTemplate("file_upload_form",modelFormTemplate);
    }
});