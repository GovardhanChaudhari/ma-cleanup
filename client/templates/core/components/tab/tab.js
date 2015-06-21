Template.tab_header.helpers({
    href:function(){
        return "#"+this.id;
    }
});

Template.tab_header.rendered=function(){
    if(this.data.active){
        $(this.find("li")).addClass("active");
    }
};

Template.tab_content.rendered=function(){
    if(this.data.active){
        $(this.find(".tab-pane")).addClass("active");
    }
};