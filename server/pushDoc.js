var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var moment = require('moment')

var fs = require('fs');
var path = require('path');


module.exports = function(req,res) {
    var content = fs
    .readFileSync(path.resolve(__dirname+"/template/", req.body.template +'.docx'), 'binary');
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);
    
    console.log("zzzzzzz")
    doc.setData(req.body)
    try {
        doc.render()
    }
    catch (error) {
        var e = {
            name: error.name,
            gender: error.gender,
            image: error.image       
        }
        console.log(JSON.stringify({error: e}));
        throw error;
    }
    
    var buf = doc.getZip()
                 .generate({type: 'nodebuffer'});
    
    var num = parseInt(Math.random() * 1000000);
    num = num<100000 ? '0' + num : num;
    
    fs.writeFileSync(path.resolve(__dirname+"/template/doc", '申请表'+num+'.docx'), buf);
    res.json({status:"success",message:'申请表'+num+'.docx'})
}