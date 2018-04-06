var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var sql = require('mysql');
var index = require('./routes/index.js');
app = express();

var sqlConfig = {
      user: 'selfstudy',
      password: 'tollbooth',
      server: 'localhost',
      database: 'self_study'
}

var connection = sql.createConnection(sqlConfig);

app.use(express.static(__dirname + '/public'));
app.use('/', index);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(morgan('dev'));


app.post("/dashboard", function(req, res){
  console.log(req.body.username);
  connection.query("select username, dlno from user WHERE username = ?", [req.body.username], function(err, data){
    if(err)
    {
      console.log("Error while querying database :- " + err);
      res.send(err);
    }
    else {
      res.send(data);
    }
  })
});

app.post('/transactions', function(req, res){
  console.log(req.body.start, req.body.end);
  connection.query("select u.fname, u.lname, t.start, t.end from transactions t, user u where u.dlno = t.dlno and timestamp >= ? and timestamp <= ?", [req.body.start, req.body.end], function(err, data){
    if(err)
    {
      console.log("Error while querying database :- " + err);
      res.send(err);
    }
    else {
      res.send(data);
    }
  })
});

app.post('/update', function(req, res){
  var reg = req.body.reg;
  var loc = req.body.location;
  console.log(reg, loc);
  var date = new Date();
  var timestamp = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
  connection.query('select id, end from transactions where dlno = ? and end is NULL', [reg], function(err, data){
    if(err)
    {
      console.log("Error while querying database :- " + err);
      res.send(err);
    }
    else {
      if(data.length)
      {
        connection.query('update transactions set end = ? where dlno = ? and end is NULL', [loc, reg], function(err, data){
          if(err)
            res.send(err);
          else {
            console.log('End Location added to reg no: ' + reg);
            res.send('End Location added to reg no: ' + reg);
          }
        });
      }
      else {
        connection.query('insert into transactions (dlno, start, timestamp) values(?, ?, ?)', [reg, loc, timestamp], function(err, data){
          if(err)
            res.send(err);
          else {
            console.log('Start Location added to reg no: ' + reg);
            res.send('Start Location added to reg no: ' + reg);
          }
        });
      }
    }
  })
})
app.listen(8080, function(){
  console.log('Listening on port 8080!');
});
