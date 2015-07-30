Template.button_export_to_pdf.events({
    'click':function(evt,template){
        console.log("exporting as pdf");

        var modelData = ModelHelpers.currentModel()._id;
        //PDFUtils.saveAsPDF(Template.modelList,{data:modelData});
        //PDFUtils.saveAsPDF(Template.modelList);
        Blaze.outputAsPDF(Template.button_export_to_pdf, 'dataurlnewwindow');

    }
});
