var routerConfig = {
    layoutTemplate: 'layout',
    notFoundTemplate: 'appNotFound',
    loadingTemplate: 'appLoading'
};

var mustBeSignedIn = function(pause) {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        RouterHelpers.goToHomePage();
        this.next();
    }else{
        this.next();
    }
};

Router.onBeforeAction(mustBeSignedIn);

if(Meteor.isClient){
    if(Meteor.Device.isPhone() || Meteor.Device.isTablet()){
        routerConfig.layoutTemplate =  "layout_phone"
    }
}

Router.configure(routerConfig);

Router.route('/', function () {
    this.subscribe(RoleDef.name).wait();
    this.render('home_page');
});

Router.route('/models/:_id', function () {
    //console.log("found model defs ", ModelDefDb.find().count(), " is server ", Meteor.isServer);
    var model = ModelDefDb.findOne({_id:this.params._id});

    if(!ArrayUtils.contains(AllReady_Published_Models,model.name)){
        MongoUtils.createModelIfNotExists(model.name);
    }
    this.subscribe(model.name).wait();
    this.render('modelList', {data: ModelDefDb.findOne({_id: this.params._id})});
}, {name: "showmodel"});

Router.route('/models/:_id/model/:modelInstanceId/:'+Form_Mode, function () {
    if(this.params[Form_Mode] === Form_Mode_New){
        this.render('model_instance_form');
    }else{
        this.render('model_instance_form',{data: ModelHelpers.getCurrentEditingModelData()});
    }
}, {name: "model_instance_form"});

/*Router.route('/modeldefs/:_id/:' + Form_Mode, function () {
    if(this.params[Form_Mode] === Form_Mode_New){
        this.render('model_def_form_tabs');
    }else{
        this.render('model_def_form_tabs', {data: ModelDefHelpers.currentModel().findOne({_id: this.params._id})});
    }

}, {name: "model_def_form_tabs"});*/

Router.route('/modeldefs/:_id/model/:_modelId/:' + Form_Mode, function () {
    if(this.params[Form_Mode] === Form_Mode_New){
        this.render('model_def_form_tabs');
    }else{
        this.render('model_def_form_tabs', {data: ModelDefHelpers.currentModel().findOne({_id: this.params._modelId})});
    }

}, {name: "model_def_form_tabs"});

Router.route('/modeldefs/:modelId/fields/:' + Form_Mode, function () {
    this.render('field_form', {data: {modelId: this.params.modelId}});
},{name:"field_form_new"});

Router.route('/modeldefs/:modelId/fields/:index/:' + Form_Mode, function () {
    //console.log("hit fields/edit route : " + this.params.index);
    this.render('field_form', {data: ModelDefHelpers.getModelDefById(this.params.modelId).fields[this.params.index]});
}, {name: "field_form"});

Router.route('/modeldefs/:modelId/fields/:index/advanced/edit', function () {
    //console.log("hit fields/edit route : " + this.params.index);
    this.render('field_form_advanced', {data: ModelDefHelpers.getModelDefById(this.params.modelId).fields[this.params.index]});
}, {name: "field_form_advanced"});


Router.route('/models', function () {
    this.render('modelList', {data: ModelDefDb.find()});
}, {name: "models"});

Router.route('/backup', function () {
    this.render('backup', {data: ModelDefDb.find()});
}, {name: "backup"});

Router.route('/database_tasks', function () {
    this.render('database_tasks', {});
}, {name: "database_tasks"});

Router.route('/fdr_dashboard', function () {
    this.render('fdr_dashboard', {data: {}});
}, {name: "fdr_dashboard"});



Router.route('/question_bank', function () {
    this.render('question_bank', {});
}, {name: "question_bank"});

Router.route('/email', function () {
    this.render('email_form', {});
}, {name: "email_form"});

