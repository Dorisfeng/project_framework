var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

const ejsexcel = require("ejsexcel");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


var obj_odoo = require('./odoo/obj_odoo.js');



var SERVER_PORT = process.env.PORT || "8000";
var SERVER_HOST = process.env.HOST || "localhost";

var server = express();
var cryptUtil = require("./des.js");
var moment = require('moment')
obj_odoo.prototype.connect();


server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    next();
})



server.use('/', express.static(path.join(__dirname, 'build')));

server.use('/ap', express.static(path.join(__dirname, 'dist')));

server.use('/docDownload', express.static(path.join(__dirname, 'template/doc')));



server.use(function (req, res, next) {
    res.session = function (req, callback) {
        console.log("111",req.body)
        if (req.get("Authorization") === undefined || req.get("Authorization") === '' || req.get("Authorization") === 'null') {
            // console.log("yyyy",req.body.token)
            // res.send('1111')
            res.send(588, "sessionError");
        }
        try {
            var uid = JSON.parse(cryptUtil.des.decrypt(req.get("Authorization") )).name;
            var date = JSON.parse(cryptUtil.des.decrypt(req.get("Authorization") )).date;

        } catch (error) {
            console.log('22', req.body)
            res.send(588, "sessionError");
        }

        if (date != moment().format("YYYY-MM-DD")) {
            console.log('err:      ', uid, date);
            // res.status(500).send({err:"登陆已经过期，请重新登陆"});
            res.send(588, "sessionError");

        } else {
            console.log('success:      ', uid, date);
            callback(uid);
        }
    }
    next()
})

//登录
server.post('/login', function (req, res) {
    var post_data = req.body
    obj_odoo.prototype.defined(post_data, function (err, data) {
        if (err) {
            obj_odoo.prototype.connect();
            res.sendStatus(500)
        } else {
            if (data && data.state == "success") {
                var session = cryptUtil.des.encrypt(JSON.stringify({
                    name: data.result.uid,
                    date: moment().format("YYYY-MM-DD")
                }));
                data.token = session;
                // console.log('55',data)
                res.json(data)
            } else {
                res.send(501, data);
            }

        }
    })

})


// 所有发往odoo的请求
server.post('/api/odoo', function (req, res) {
    // console.log("12344", req.body)
    res.session(req, function () {
        var post_data = req.body
        // post_data.params.uid = uid;
        obj_odoo.prototype.defined(post_data, function (err, data) {
            if (err) {
                console.log(err)
                obj_odoo.prototype.connect();
                // res.send(500);
                res.sendStatus(500)
                res.json({ state: "fail", result: err })
            } else {
                if (data && data.state == "success") {
                    res.json(data)
                } else {
                    res.json(data)
                    // res.send(501, data);
                }

            }
        })
    })
})









server.listen(SERVER_PORT, () => console.log(
    `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://${SERVER_HOST}:${SERVER_PORT}`
));
