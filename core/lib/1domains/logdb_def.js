/**
 * Created by gvc on 21-08-2015.
 */

LogDB_Source="source";
LogDB_Mode="mode";
LogDB_Description="description";
LogDB_Time="time";

LogDBDef={
    "name":"logdb",
    "fields":
    [
        {"name":LogDB_Source,"type":"string","label":"Source"},
        {"name":LogDB_Mode,"type":"string","label":"Mode"},
        {"name":LogDB_Description,"type":"text","label":"Description"},
        {"name":LogDB_Time,"type":"date","label":"Time"}
    ],
        "isBaseModel":"true"
};

//LogDef = SystemDefaultsHelpers.getDefaultModelDefs("logdb");

logDb = MongoUtils.createModel(LogDBDef.name);

if(Meteor.isClient){
    Meteor.subscribe(LogDBDef.name);
}

