var path = require('path'); 
var fs = require('fs');
var getPath = function(url) {
    return path.resolve(__dirname, url);
};
//遍历文件
var loopFile = function(path, handleFile){
    files = fs.readdirSync(path);
    files.forEach(function(item) {
        var filesPath = path + '/' + item;
        var stats = fs.statSync(filesPath);
        if (stats.isDirectory()) {
            if(item === '.svn'){
                return false;
            }
            loopFile(filesPath,handleFile);
        } else {
            handleFile(filesPath,stats);
        }
    });
};
 
//生成目录
var mkdirSync=function(path){
    if(!fs.existsSync(getPath(path))){
        fs.mkdirSync(getPath(path));
    }
}

module.exports={ 
    loopFile:loopFile,
    mkdirSync:mkdirSync
}