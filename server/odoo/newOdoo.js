var Odoo = require('./odoo.js');


// //本地测试

var json_info = new require('config-lite');
console.log(json_info)
//test环境
var odoo = new Odoo(  {host: json_info.host,
  port: json_info.port,
  database: json_info.database,
  username: json_info.username,
  password: json_info.password});

module.exports = odoo;
