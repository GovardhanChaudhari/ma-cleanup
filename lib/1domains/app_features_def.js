AppFeatureDef = {
    name:"appfeatures",
    fields:[
        {name:"name"},
        {name:"enabled",type:Data_Type_Boolean},
        {name:"user",type:Data_Type_Combo,model_name:"user",display_value:"email"}
    ],
    isBaseModel:true,
    owner:Admin_Email,
    isPublished:false
};

AppFeatureDb = MongoUtils.createModel(AppFeatureDef.name);
