var fs = Meteor.npmRequire('fs');
/*only works on server side code*/
FSUtils= {
    createDir:function(path,mode){
        fs.mkdirSync(path,mode);
    },

    createFile:function(filePath,contents,options){
        fs.writeFileSync(filePath,contents,options);
    }
};