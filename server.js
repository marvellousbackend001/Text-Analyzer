const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
/****************Connecting To  Mysql************************* */
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CHIDERA001?.1",
    database: "text_analyzer",
    port: "3306",
});
//creating an endpoint that handles users registration
app.post("/register", bodyParser.json(), function (req, res) {
    const { username, email, password } = req.body;
    const sql = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;
    con.query(sql, [username, email, password], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});
//creating an endpoint that handles users login
app.get("/login", bodyParser.json(), function (req, res) {
    var sql = `SELECT * FROM users WHERE email ='${req.body.email}'AND password ='${req.body.password}' `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})
// Endpoint to handle POST requests containing text data
app.post("/create_texts", bodyParser.json(), function (req, res) {
    const { user_id, content } = req.body;
    const sql = `INSERT INTO texts (user_id, content) VALUES (?, ?)`;
    con.query(sql, [user_id, content], function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});
//Endpoint to retrieve text data by id
app.get("/texts/:id", bodyParser.json(), function (req, res) {
    const text_id = req.params.id;
    const sql = `SELECT * FROM texts WHERE id = ?`;
    con.query(sql, [text_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})
// Endpoint for updating text by id 
app.put("/update_text/:id", bodyParser.json(), function (req, res) {
    const text_id = req.params.id;
    const { content } = req.body;
    const sql = `UPDATE texts SET content = ? WHERE id = ?`;
    con.query(sql, [content, text_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});
// Endpoint for deleting text by id 
app.delete("/delete_text/:id", bodyParser.json(), function (req, res) {
    const text_id = req.params.id;
    const sql = `DELETE FROM texts WHERE id = ?`;
    con.query(sql, [text_id], function (err, result) {
        if (err) throw err;
        res.send(result)
    })
});
app.listen(8080)
    , console.log("your server is running at port 8080");
