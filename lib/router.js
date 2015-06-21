var routerConfig = {
    layoutTemplate: 'layout',
    notFoundTemplate: 'appNotFound',
    loadingTemplate: 'appLoading',

    waitOn: function () {
        //console.log("called waiton .................");
        Meteor.subscribe("model");
        //console.log("found model defs ", ModelDefDb.find().count());

        var models = ModelDefDb.find().fetch();
        //models = ArrayUtils.removeElementByPropertyNameAndValues(models,"name",AllReady_Published_Models);
        ArrayUtils.each(models, function (model) {
            Meteor.subscribe(model.name);
            if (Meteor.isClient && model.name !== ModelDb_Name) {
                try {
                    //TODO check that model is already publish on client, if so ignore this step
                    new MongoUtils.createModel(model.name);
                } catch (err) {
                    //console.log("Err: ", err);
                }
            }
        });
    }
};

if(Meteor.isClient){
    if(Meteor.Device.isPhone()){
        routerConfig.layoutTemplate =  "layout_phone"
    }
}

Router.configure(routerConfig);


Router.route('/', function () {
    this.render('home_page');
});

Router.route('/models/:_id', function () {
    this.render('modelList', {data: ModelDefDb.findOne({_id: this.params._id})});
}, {name: "showmodel"});

Router.route('/models/:_id/edit', function () {
    this.render('model_instance_form', {data: ModelHelpers.getCurrentEditingModelData()});
}, {name: "model_instance_form"});

Router.route('/models/:_id/new', function () {
    this.render('model_instance_form');
}, {name: "model_instance_form_new"});

Router.route('/modeldefs/:_id/edit', function () {
    this.render('model_def_form', {data: ModelHelpers.currentModel().findOne({_id: this.params._id})});
}, {name: "model_def_form"});

Router.route('/modeldefs/:_id/new', function () {
    this.render('model_def_form');
}, {name: "new_model_def_form"});

Router.route('/modeldefs/:modelId/fields/:index/edit', function () {
    //console.log("hit fields/edit route : " + this.params.index);
    this.render('field_form', {data: ModelDefHelpers.getModelDefById(this.params.modelId).fields[this.params.index]});
}, {name: "field_form"});

Router.route('/modeldefs/:modelId/fields/:index/advanced/edit', function () {
    //console.log("hit fields/edit route : " + this.params.index);
    this.render('field_form_advanced', {data: ModelDefHelpers.getModelDefById(this.params.modelId).fields[this.params.index]});
}, {name: "field_form_advanced"});

Router.route('/models/:modelId/fields/new', function () {
    this.render('field_form', {data: {modelId: this.params.modelId}});
}, {name: "field_form_new"});

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

// mobile routes
Router.route('/mobile/modeldefs/', function () {
    this.render('model_def_list_phone', {});
}, {name: "model_def_list_phone"});

Router.route('/mobile/models/:_id', function () {
    this.render('model_instance_list_phone', {data: ModelDefDb.findOne({_id: this.params._id})});
}, {name: "model_instance_list_phone"});

Router.route('/mobile/models/:_id/details/:itemId', function () {
    this.render('model_instance_details_phone', {data: ModelHelpers.getModelInstanceById(this.params.itemId)});
}, {name: "model_instance_details_phone"});

Router.route('/mobile/models/:_id/new', function () {
    this.render('model_instance_form');
}, {name: "model_instance_form_new_mobile"});

Router.route('/mobile/models/:_id/edit', function () {
    this.render('model_form_phone',{data: ModelHelpers.getCurrentEditingModelData()});
}, {name: "model_instance_form_edit_mobile"});

/**********************************************************************/

Router.route('/question_bank', function () {
    this.render('question_bank', {});
}, {name: "question_bank"});

Router.route('/email', function () {
    this.render('email_form', {});
}, {name: "email_form"});

