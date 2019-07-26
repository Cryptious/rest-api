// 1. call need package and define port and some instances
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
var port = 8080;
var router = express.Router();

// model instances
var User = require('./app/models/user');

// 2. user body parser to get data from HTTP request
app.use(bodyParser.urlencoded{
  extended:true
});
app.use(bodyParser.json());

//3. create connection to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample');

//4. API Routes
router.get('/', function(req, res){
  res.json({
    message:"Welcome to REST API SAMPLE"
  });
});

// model related routes
// post data untuk create user
// get untuk get all user
router.route('/users')
  .post(function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.name = req.body.name;
    user.email = req.body.email;
    user.save(function(err){
      if(err) res.send(err);
        else res.json({
          message:"New User Created"
        });
      });
    })
    .get(function(req, ress){
      User.find(function(err, users){
        if(err) res.send(err);
        else res.json(users);
      });
    });

// get a user
// put untuk update user attribut
// delete untuk delete user

router.route('/users/:username')
  .get(function (req, res){
    User.findOne({
      username:req.params.username
    },function(err, user){
      if(err) res.send(err);
      else res.json(user);
    });
  });
  .put(function (req, res){
    User.findOne({
      username:req.params.username
    },function(err, user){
      if(err) res.send(err);
      else{
        user.username = req.body.username;
        user.password = req.body.password;
        user.name = req.body.name;
        user.email = req.body.email;
        user.save(function(err){
          if(err) res.send(err);
          else res.json({
            message:"User telah diupdate"
          });
        });
      }
    });
  });
  .delete(function (req, res){
    User.remove({
      username:req.params.username
    }, function(err, user){
      if(err) res.send(err);
      else res.json({
        message:"User Dihapus"
      })
    });
  });

  api.use('/api', routes);
  api.listen(port);
  console.log('Service Started at port: ' + port );
