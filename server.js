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
  connection.query("select * from user WHERE username = ?", [req.body.username], function(err, data){
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
  connection.query("select * from transactions"/* WHERE start = ? and end = ?", [req.body.start, req.body.end]*/, function(err, data){
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

app.listen(8080, function(){
  console.log('Listening on port 8080!');
});
