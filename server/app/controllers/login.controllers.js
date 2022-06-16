var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  User = require('../models/user.model')
  jwt = require('jsonwebtoken');
  
  // This generate the token
accessTokenSecret ="thisisthefirsttokenthatigenerated"

exports.create_a_login = async function (req, res) {
    let user = {};
    User.findOne({ username: req.body.username })
      .then(_user => {
        if (!_user) { throw new Error("User not found") }
        user = _user;
        return bcrypt.compare(req.body.password, _user.password);
      })
      .then(result => {
        if (!result) { throw new Error('Password doesnot match') };
        return jwt.sign(
          {
           username:req.body.username
          },
          accessTokenSecret
        );
      })
      .then(token => {
        return res.json({ token });
      })
      .catch(err => {
        return res.send(err);
      });
  };

exports.findAll = (req,res) =>{
    User.find()
    .then(users =>{
        res.send(users)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error Occur while retrieving the user"
        })
    })
};

// Verify

exports.verify = (req,res, next)=>{
const bearerHeader = req.headers['authorization']
let bearer = bearerHeader.split(' ')[1];
let token = ''
try {
    let parse = json.parse(bearer);
    token = parse.token
}
catch(e) {
    token = bearer.token
}
if(!token) {
    return res.status(403).send('A token is required for authentication');
}
try{
    const decoded = jwt.verify(token,'secretkey')
    req.user = decoded
}
catch(err){
    return res.status(401).send('Invalid Token')
}
return next();
}