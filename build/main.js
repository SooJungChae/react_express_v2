'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mssql = require('mssql');

var _mssql2 = _interopRequireDefault(_mssql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db_config = require(__dirname + '/../server/config/db-config.json');
var config = {
    server: db_config.server,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
};

var app = (0, _express2.default)();
var port = 3000;

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/grid', function (req, res) {
    console.log("/grid");
    var pool = new _mssql2.default.ConnectionPool(config, function (err) {
        pool.request().query('SELECT AgentCode, AgentSeqNo, CustomerName ' + 'FROM AgentInfo', function (err, result) {
            if (err) {
                console.log(err);
                return res.send('pong');
            }
            console.log(result);
            return res.send(JSON.stringify(result.recordsets[0]));
        });
    });
});

app.get('/user/:id?', function (req, res) {
    console.log("/user/:id?");
    var id = req.params.id;

    var query = "SELECT AgentCode, AgentSeqNo, CustomerName " + "FROM AgentInfo ";

    if (id) {
        query += "WHERE AgentCode  LIKE '%" + id + "%' " + " AgentSeqNo LIKE '%" + +"%'" + "";
    }

    var pool = new _mssql2.default.ConnectionPool(config, function (err) {
        pool.request().query(query, function (err, result) {
            if (err) {
                console.log(err);
                return res.send('pong');
            }
            console.log(result);
            return res.send(JSON.stringify(result.recordsets[0]));
        });
    });
});

app.post('/login', function (req, res) {
    var params = req.body;
    console.log('/login');
    console.log(params);

    var query = "SELECT "
    // + "AgentSeqNo "
    + "President " + "FROM AgentInfo " + "WHERE AgentCode = '" + params.agentCode + "' " + "AND AgentSeqNo = '" + params.password + "' " + "";

    var pool = new _mssql2.default.ConnectionPool(config, function (err) {
        pool.request().query(query, function (err, result) {
            if (err) {
                console.log(err);
                return res.send('pong');
            }
            console.dir(result);
            return res.send({
                resultCount: result.rowsAffected[0],
                president: result.recordset[0].President
            });
        });
    });

    // res.send(JSON.stringify({result: true}));
});

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});