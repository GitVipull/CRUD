const Users = require('./user.model.js');

///Create new user
exports.create = (req, res) => {
    // Request validation
      if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        country: req.body.country
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

// Fetch all the records from DB.

exports.findAll = (req, res) => {
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving user's details."
        });
    });
};

  exports.findOne=(req, res)=>{
    Users.findById(req.params.userId)
    .then((user)=>{
      if(!user){
          return res.status(404).send({
            messgae: "User not found with id" +req.params.userId
          });
      }
      res.send(user);
    }).catch(err=>{
      if(err.kind==='objectId'){
        return res.status(404).send({
          message:"User not found with Id "+ req.params.userId
        });
      }
      return res.status(500).send({
        message:"Something wrong retrieving User with ID"+ req.params.userId
      });
    });
  };

//Update a user

exports.update=(req, res)=>{

  if(!req.body){
    return res.status(400).send({
      message: "user content can not be empty"
    });
  };

  Users.findByIdAndUpdate(req.params.userId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    country: req.body.country

  },{new: true})
  .then(user=>{
      if(!user){
        res.status(404).send({
          message: "User not found with id"+ req.params.userId
        });
      }
      res.send(Users);
  }).catch(err=>{
    if(err.kind==='objectId'){
        return res.status(404).send({
          message:"User not found with id"+req.params.userId
        });
    }
    return res.status(500).send({
        message:"Something wrong with User Id"+ req.params.userId
    });
  });

};

// Deletiong a user.
exports.delete=(req, res)=>{
  Users.findByIdAndRemove(req.params.userId)
  .then(user=>{
    if(!user){

      return res.status(404).send({
        message:"User not found with id"+ req.params.userId
      });
    }

    res.send({message: "User deleted Successfully"})
  }).catch(err=>{
    if(err.kind==='objectID'|| err.name==='NotFound'){
      return res.status(404).send({
        message: "User not found with id"+ req.params.userId
      });
    };
    return res.status(500).send({
        message:"Could not delete User with id"+ req.params.userId
    });
  });

};
