Template.nav.helpers({
	models: function(){
		var models = ModelDefHelpers.getAllModelDefs();
		return models;
	}

	/*ready:function(){
		return _.all(Template.instance().subscriptions,function(sub){
			return sub.ready();
		})
	}*/
});

Template.nav.created = function(){
	console.log("Nav template created");
	// here subscriptions stores handle returned by subscribe method, which will later be used to
	// check whether subscription is ready or not
	/*this.subscriptions = [
		Meteor.subscribe(ModelDb_Name,{

			onReady:function() {

				console.log("client bootstrap: model is ready ");
				//console.log("is model ready *** found defs: " + ModelDefDb.find().count());

				var models = ModelDefHelpers.getAllModelDefs();
				if (models.length === 0) {
					console.log("no models found: " + models);
				} else {
					//console.log("found models : " + models.length);
					_.each(models, function (model) {
						// check whether this model is model definition
						if (ModelDefHelpers.isModelDefinition(model.name)) {

						} else {
							// check if model already exist in modeldb or not
							if (ModelDefHelpers.getModelDefByName(model.name)) {
								// subscribe other models in modeldb such as users,roles
								var options = {};
								//TODO: correct flow of model creation and subscription of avoid server side
								// errors.
								ModelHelpers.publishAndSubscribeModel(model.name);
								//RESTUtils.serverCreateRESTAPIByCollectionName(model.name);
							} else {
								// this case arrives when model is created by importing model def file
								if (ArrayUtils.contains(Base_Models, model.name)) {

								} else {
									new Mongo.Collection(model.name);
								}
							}
						}
					});
				}
			} // end of OnReady
			,

			onStop:function(){
				console.log("subscription failed: ", Meteor.Error);
			}

		})
	];*/
};