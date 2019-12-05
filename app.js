
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { exec } = require('child_process');

const mysql = require('mysql');
const express = require('express');
const app = express();

const databaseWrapper = require('./db_wrapper.js');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sos'
};
const database = new databaseWrapper.Database(mysql, config);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static('public'));


/*********************************************/

  //MAIN

  serve();

/*********************************************/


function serve() {

  app.post('/login', function(req, res) {

    console.log("login " + req.body.login +" : "+ req.body.password);

    let query = 'SELECT id FROM users WHERE login = ? AND password = ?;';
    database.query(query, [req.body.login, req.body.password])
    .then (rows => {
      console.log(rows);
      if(rows.length > 0) {
        console.log("login successful");

        res.json({message: 'gg', result: 'ok', id: rows[1]});
      } else {
        console.log("login error");

        res.json({message: 'wrong creds bro', result: 'error'})
      }
    });

  });

  app.post('/signup', function(req, res) {
    let query = 'INSERT INTO users(login, password, finame, faname) VALUES (?, ?, ?, ?)';
    database.query(query, [req.body.login, req.body.password, req.body.finame, req.body.faname])
    .then (rows => {
      console.log(rows);
      if(rows.length > 0) {
        console.log("signup successful");

        res.json({message: 'ur signed up bro', result: 'ok', id: rows[1]});
      } else {
        console.log("signup error");

        res.json({message: 'signup error', result: 'error'})
      }
    });
  });

  app.post('/listalerts', function(req, res) {
    let query = 'SELECT id, date, lat, lng WHERE user_id = ?';
    database.query(query, [req.body.id])
    .then (rows => {
      if(rows.length > 0) {
        console.log("seeded alerts for id " + req.body.id);

        res.json({message: 'here ur alerts', result: 'ok', alerts: rows});
      } else {
        console.log("no alerts for id " + req.body.id);

        res.json({message: 'no alerts for u', result: 'error'})
      }
    });
  });

  app.post('/newalerts', function(req, res) {
    let query = 'INSERT INTO alerts(user_id, lat, lng) VALUES (?, ?, ?)';
    database.query(query, [req.body.id, req.body.lng, req.body.lng])
    .then (rows => {
      if(rows.length > 0) {
        console.log("added alert for id " + req.body.id);

        res.json({message: 'ok i added ur alert', result: 'ok'});
      } else {
        console.log("no alerts for id " + req.body.id);

        res.json({message: 'sry i fuckd adding ur new alert in da db', result: 'error'})
      }
    });
  });

  app.post('*', function(req, res) {
    res.json({message: 'Fais pas ta pute'})
  });

  app.listen(6666);

  console.log("Serving...");
}
