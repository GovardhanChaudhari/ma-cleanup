Meteor.methods({

	base64ToString:function(data){
		var buffer = new Buffer(data, 'base64');
		return buffer.toString();
	},

	CSVToJSON:function(csvData){
		var obj = CsvUtils.CSVToJSON(csvData,function(err,jsonObj){
			_.each(jsonObj,function(obj1){
				console.log("csv utils : " + ObjectUtils.printDetails(obj1));	
			});
			return jsonObj;
		});
		
		return obj;
		
	},

	importCsv:function(modelName,primaryKey,csvData){
			// this is server code so we cant use ModelHelpers.currentModel()
			// to get current model since it uses session and session is not 
			//available on server		
			var model;
			if(modelName === ModelDb_Name){
				model = ModelDefDb;
			}else{
				model = ModelDefDb.findOne({name:modelName});
				var mongoModel = MongoUtils.getCollection(modelName);
				model = ObjectUtils.merge(model,mongoModel);
				ModelHelpers.addGenericMethods(model,modelName);
			}

			//ModelHelpers.addGenericMethods(model,modelName);
			
			var boundFunction = Meteor.bindEnvironment(function(err,result){
				if(err){
					console.log("Error while converting csv to json : " + err);
				}else{
					_.each(result,function(obj){
						//console.log("importing object : " ,obj);
						if(modelName === ModelDb_Name){
							//ModelHelpers.publishModel(obj,{});
							var fieldsString = obj.fields;
							//console.log("fields string : " + fieldsString);
							fieldsString = fieldsString.replace(/'/g,"\"");
							//console.log("field string after replace : " + fieldsString);
							obj.fields = JSON.parse(fieldsString);
							//csvData = csvData.replace(/"/g,"\\");
							ModelHelpers.publishModel(obj.name);

						}
						var searchOptions = {};
						//searchOptions[primaryKey] = obj[primaryKey];
						console.log("finding record with search options : ", searchOptions);
						model.insert(obj);
						//TODO
						var foundRecord = model.findOne(searchOptions);
						/*if(foundRecord){
							console.log("***********************************found model, updating it, model : ",foundRecord);
							DBUtils.update(model,foundRecord._id,obj);
						}else{
							console.log("importing json obj:",obj );
							model.insert(obj);
						}*/
					});
					return result;
				}
			},function(err){
				console.log("could not wrap the callback");
			});

			return CsvUtils.CSVToJSON(csvData,boundFunction);
	},

	httpGet:function(url,options){
		var data = HTTP.get(url,options);
		console.log("data: ",data);
		return data;
	},

	pluckData:function(html){
		return HTMLUtils.pluckData(html);
	},

	createRESTAPIByCollectionName:function(collectionName){
		RESTUtils.createRestApiByCollectionName(collectionName);
	},

	sendEmail:function(options){
		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();
		var emailConfig =SystemConfigHelpers.getEmailConfig();
		process.env.MAIL_URL = emailConfig.url;
		options.from = options.from || emailConfig.admin_email;
		EmailUtils.sendEmail(options);
	}

});