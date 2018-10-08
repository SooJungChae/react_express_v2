import express from 'express';
import bodyParser from 'body-parser';
import sql from "mssql";
import path from 'path';

let db_config = require(__dirname+'/../server/config/db-config.json');
const config = {
    server   : db_config.server,
    port     : db_config.port,
    user     : db_config.user,
    password : db_config.password,
    database : db_config.database
};

const app = express();
const port = 3000;

app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    console.log("/users");
    const pool = new sql.ConnectionPool(config, err => {
        pool.request()
            .query(
                'SELECT AgentCode, AgentSeqNo, CustomerName ' +
                'FROM AgentInfo',
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.send('pong');
                    }
                    console.log(result);
                    return res.send(JSON.stringify(result.recordsets[0]));
                })
    });
});

app.get('/user/:id?', (req, res) => {
    console.log("/user/:id?");
    const id = req.params.id;

    let query = "SELECT AgentCode, AgentSeqNo, CustomerName " +
                "FROM AgentInfo ";

    if (id) {
        query += "WHERE AgentCode  LIKE '%" + id + "%' " +
            " AgentSeqNo LIKE '%" +  + "%'" +
            "";
    }

    const pool = new sql.ConnectionPool(config, err => {
        pool.request()
            .query(
                query,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.send('pong');
                    }
                    console.log(result);
                    return res.send(JSON.stringify(result.recordsets[0]));
                })
    });
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify({result: true}));
});


const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});
