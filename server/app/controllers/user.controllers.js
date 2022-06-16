const mongoose = require('mongoose')
const  bcrypt = require('bcrypt')
const  User = require('../models/user.model')

// Post User / Create User

  exports.create = async function (req,res) {    
      let user = await User.findOne({ username: req.body.username });
      if (user) return res.status(500).send('User already exist');
      const salt = await bcrypt.genSalt(10);
      console.log("salt", salt);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      console.log("req.body.password", req.body.password);
      var new_user = new User(req.body);
      new_user.save(function (err, _user) {
          if (err) {
              res.send(err);
              return;
            }
            res.json(_user);
        });
    }
    
// Retrieve All Users 
    
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

// Retrieve one user

exports.findone = (req,res) =>{
    User.findById(req.params.userId)
    .then(user =>{
        if(!user){
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            })
        }
        res.send(user)
    })
    .catch(err =>{
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                message: "User not found with id" + req.params.userId
            })
        }
        return res.status(500).send({
            message: "Error retrieving user with id" + req.params.userId
        })
    })
    

};

// Delete user

exports.delete = (req,res) =>{

    User.findByIdAndRemove(req.params.userId)
    .then(user =>{
        if(!user){
            return res.status(404).send({
                message: "User not found with id" + req.params.userId
            })
        }
        res.send({message: "User deleted successfully"})
    })
    .catch(err =>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound')
        res.status(404).send({
            message: "User not found with id" + req.params.userId
        })
        return res.status(500).send({
            message: "Could not delete user with id" + req.params.userId
        });
    });
}

// Update user

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    
    User.findByIdAndUpdate(req.params.userId, {
        firstname: req.body.firstname ,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};




