const bcrypt = require('bcrypt');/* package bcrypt to hash elements */
const jwt = require('jsonwebtoken');/* jsonwebtoken plugin enabling to generate tokens for autentication purposes */
const db = require("../models/index.js"); // models path depend on your structure
const fs = require ('fs');/* package 'file system' to access, modify and delete files */
const Users = db.user;

// Signing up in controller
exports.signup = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Set role to users
  if(req.body.email === "candice.paillard@groupomania.com"){
    role_user = "admin"
  } else {
    role_user = "lambda"
  }
  bcrypt.hash(req.body.password, 10)/* hashing the password for security purposes */
    .then(hash => {
      // If a profile picture has been uploaded, set req.body.imageUrl 
      // (if no image uploaded, will be default-picture, set in frontend)
      if (req.file) {
        req.body.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
      }
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: role_user,
        imageUrl: req.body.imageUrl
      };

      // Create user in the database
      Users.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });
    })
};

// Logging in controller
exports.login = (req, res, next) => {

  Users.findOne({ where: { email: req.body.email }})/* looking for an email in database that would match the email logged in */
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" }); 
      }
      bcrypt.compare(req.body.password, user.password)/* if email matches one in database, we compare the password looged in with the one linked to the user */
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect !" });            
          }
          res.status(200).json({
            userId: user.id,
            role: user.role,
            token: jwt.sign(/* generating a token */
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '8h' }
            )            
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Accessing to one user controller
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// Modifying one user controller
exports.updateUser = (req, res) => {
  const id = req.params.id;
  // If a profile picture has been uploaded
  if (req.file) {
    req.body.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
  }
  if(req.body.password==null) {
    userModif = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl
    };
    update(userModif);
  } else {
    Users.findOne({ where: { id: id } })/* looking for a userId in database that would match the userId logged in */
    .then(user => {
      bcrypt.compare(req.body.oldPassword, user.password)/* if email matches one in database, we compare the password looged in with the one linked to the user */
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          bcrypt.hash(req.body.password, 10)/* hashing the password for security purposes */
          .then(hash => {
            userModif =  {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              imageUrl: req.body.imageUrl,
              password: hash
            };
            update(userModif);
          })
        })
        .catch(error => res.status(500).json({ error }));   
    })
    .catch(error => res.status(500).json({ error }));
  }

  function update(modifUser) {
  Users.update(modifUser, {
  where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
  }
};

// Deleting a user controller
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  Users.findOne({ 
    where: { id: id } /* looking for a userId in database that would match the userId logged in */
  })
  .then(user => {
    const filename = user.imageUrl.split('/images/')[1];
    // If an image is part of the post, delete the image from the folder
    if (filename !== 'default-picture.jpg') {
      fs.unlink(`images/${filename}`, () => { /* deleting the image file from the folder 'images' if the image is not 'default-picture' */
        deleteUser(id) /* Call function to delete a user */
      }) 
    } else {
      deleteUser(id) /* Call function to delete a user */
    }
      
  })
  .catch(error => res.status(500).json({ error }));

  // Function to delete a user from database
  function deleteUser(user_id) {  
    Users.destroy({
      where: { id: user_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
    }
};

// Retrieving all users controller
exports.findAllUsers = (req, res) => {

  Users.findAll()    
  .then(data => {    
      res.send(data);    
  })    
  .catch(err => {    
      res.status(500).send({    
          message:    
          err.message || "Some error occurred while retrieving tutorials."    
      });        
  });    
};