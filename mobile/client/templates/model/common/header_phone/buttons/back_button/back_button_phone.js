Template.back_button_phone.events({
    "click":function(evt,template){
        EventUtils.stopDefault(evt);
        console.log("clicked  back button");
        window.history.back();
    }
});