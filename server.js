var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var app = express();


app.set('port', process.env.PORT || 3004);
app.set('host', process.env.NODE_IP || 'localhost');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './')));


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
