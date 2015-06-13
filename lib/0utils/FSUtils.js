/*only works on server side code*/
if(Meteor.isServer){
    var fs = Meteor.npmRequire('fs');
}

FSUtils= {
    createDir:function(path,mode){
        fs.mkdirSync(path,mode);
    },

    createFile:function(filePath,contents,options){
        fs.writeFileSync(filePath,contents,options);
    }
};