const express = require("express"), app = express(), bodyParser = require("body-parser"),
      methodOverride = require("method-override"), mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zlivio', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

let models = require('./models/user')(app, mongoose);
let UserCtrl = require('./controllers/user');

let user = express.Router();

app.use('/api', user);

user.route('/user/create')
  .post(UserCtrl.addUser);

user.route('/user/find/:userName')
  .get(UserCtrl.userFindById)

user.get('/*', function(req, res) {
  return res.status(500).send({ 
    result: 'Esta ruta no está disponible'
  });
});

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});