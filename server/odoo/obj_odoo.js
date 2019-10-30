var odoo = require('./newOdoo.js');
function obj_odoo(){}

obj_odoo.prototype.connect = function(){
 
  odoo.connect(function (err) {
    if (err) {
      // res.setHeader('Cache-Control', 'no-cache');
      // res.json('error');
      return;
    }
   
   
  });
}

obj_odoo.prototype.defined = function(req,callback){
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) {
  //     callback(err);
  //     return;
  //   }
    odoo.method(req.model, req.method,[, req.params] , function (err, returnInfo) {
      callback(err, returnInfo);
    });
  // });
}


obj_odoo.prototype.delete = function(req,res){
  // Connect to Odoo
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) { return console.log(err); }
  //   console.log(req);
    // Get a partner
    odoo.delete(req.model, Number(req.id) , function (err, companys) {
      if (err) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json('error');
      }else{
        res.setHeader('Cache-Control', 'no-cache');
        res.json('success');
      }
    });
  // });
}

obj_odoo.prototype.get = function(req,res){
  // Connect to Odoo
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) { return console.log(err); }
  //   console.log(req);
    // Get a partner
    odoo.get(req.model, Number(req.id) , function (err, company) {
      if (err) {
        console.log(err);
        res.setHeader('Cache-Control', 'no-cache');
        res.json('error');
      }else{
        console.log(company);
        res.setHeader('Cache-Control', 'no-cache');
        res.json(company);
      }
    });
  // });
}

obj_odoo.prototype.update = function(req,res){
  // Connect to Odoo
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) { return console.log(err); }
  //   // Get a partner
  //   console.log('newdata:',req.params);
    odoo.update(req.model, Number(req.id), JSON.parse(req.params) , function (err, company) {
      if (err) {
        console.log(err);
        res.setHeader('Cache-Control', 'no-cache');
        res.json('error');
      }else{
        res.setHeader('Cache-Control', 'no-cache');
        res.json(company);
      }
    });
  // });
}

obj_odoo.prototype.create = function(req,res){
  // Connect to Odoo
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) { return console.log(err); }
  //   // Get a partner
  //   console.log('createdata:',req.params);
    odoo.create(req.model , JSON.parse(req.params) , function (err, company) {
      if (err) {
        console.log('err:',err);
        res.setHeader('Cache-Control', 'no-cache');
        res.json('error');
      }else{
        res.setHeader('Cache-Control', 'no-cache');
        res.json(company);
      }
    });
  // });
}

obj_odoo.prototype.search = function(req,callback){
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   if (err) {
  //     console.log("err",err)
  //     callback(err);
  //     return console.log(err);
  //   }
  //   // Get a partner
  //   console.log('searchdata:',req.params);
    odoo.search(req.model , req.params , function (err, returnInfo) {
      console.log("err",err,"result",returnInfo)
      callback(err, returnInfo);
    });
  // });
}

obj_odoo.prototype.login = function(req,res){
  // odoo.username = req.username;
  // odoo.password = req.password;
  // odoo.connect(function (err) {
  //   console.log(err);
    odoo.method('wc.login.log', 'get_login_username' , [,req.params] , function (err, user) {
      if (err) {
        console.log(err);
        res.setHeader('Cache-Control', 'no-cache');
        res.json('error');
      }else{
        console.log(user);
        res.setHeader('Cache-Control', 'no-cache');
        res.json(user);
      }
    });
  // });
}

module.exports = obj_odoo;
