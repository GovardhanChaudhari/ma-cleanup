/**
 * Created by gvc on 21-08-2015.
 */
DBLogger_Mode_Info = "info";
DBLogger_Mode_Debug = "debug";
DBLogger_Mode_Error = "error";

// TODO move log config to server or private
Log_Config = {
    "enabled":true,
    "mode" : DBLogger_Mode_Debug
};

DBLogger = function(){

    // private method
    function log(mode,data){
        console.log(data);
        // log only if logging is enabled
        if(Log_Config.enabled){
            // log only specified mode
            if(Log_Config.mode === mode){
                var logRecord={};
                logRecord[LogDB_Mode] = mode;
                logRecord[LogDB_Time] = DateUtils.getCurrentDateTimeString();
                logRecord[LogDB_Description] = data;
                if(Meteor.isServer){
                    logRecord[LogDB_Source] = "server";
                }else{
                    logRecord[LogDB_Source] = "client";
                }

                DBUtils.insert(logDb,logRecord);
            }
        }
    }

    return{
        info:function(data){
            log(DBLogger_Mode_Info,data);
        },

        debug:function(data){
            log(DBLogger_Mode_Debug,data)
        },

        error:function(data){
            log(DBLogger_Mode_Error,data);
        }
    };
}();
