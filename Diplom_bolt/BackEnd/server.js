const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./app/config/db.config")

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const pool = mysql.createPool({
    connectionLimit: 5,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD
});

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/15589-70/diameters", function (req, res,next) {
    pool.query("SELECT d FROM `table1_15589-70`", function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});

app.get("/15589-70/lenghts/:D", function (req, res,next) {
    const D = req.params.D
    pool.query("SELECT l FROM `table2_15589-70` WHERE d = " + D + " AND b != 0", function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});

app.get("/15589-70/data1/:D/:L", function (req, res,next) {
    const D = req.params.D
    const L = req.params.L
    pool.query("SELECT * FROM `table1_15589-70` WHERE d = " + D, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});

app.get("/15589-70/data2/:D/:L", function (req, res,next) {
    const D = req.params.D
    const L = req.params.L
    pool.query("SELECT * FROM `table2_15589-70` WHERE d = " + D + " AND l = "+ L , function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});


app.get("/", function (req, res,next) {
    pool.query("SELECT * FROM `GOST_TYPES`", function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data)
    });
});
/*
app.get("/:GOST", function (req, res,next) {
    const GOST = req.params.GOST;
    var queryStr = "SELECT * FROM `" + GOST + "`";
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});

app.get("/:GOST/:TYPE", function (req, res) {
    const GOST = req.params.GOST;
    const TYPE = req.params.TYPE;
    var queryStr = "SELECT * FROM `" + GOST + "` WHERE GOST = " + TYPE;
    pool.query(queryStr, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.json(data);
    });
});

*/

app.listen(3000, function () {
    console.log("Сервер подключен");
});