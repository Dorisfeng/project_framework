var fs = require('fs');
var formidable = require('formidable');

function upLoadImg(req,res,callback){
  console.log("zaq",req.body)
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = './build/files/';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024;   //文件大小
  form.parse(req, function(err, fields, files) {
    var extensions = files.file.name.split('.')[files.file.name.split('.').length-1];
    var firstname = files.file.name.split('.')[0]
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var num = parseInt(Math.random() * 1000000);
    month = month<9 ? '0' + month : month;
    day = day<9 ? '0' + day : day;
    num = num<100000 ? '0' + num : num;
    var name = firstname + '``' + year + month + day+ '``' + num + '.' + extensions;
    console.log("namenamename",name)
    fs.rename(files.file.path,'./build/files/' + name);
    callback(name)
  });
}

module.exports = upLoadImg;