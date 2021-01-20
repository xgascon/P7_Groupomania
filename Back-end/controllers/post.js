const bcrypt = require('bcrypt');/* package bcrypt to hash elements */
const jwt = require('jsonwebtoken');/* jsonwebtoken plugin enabling to generate tokens for autentication purposes */
const db = require("../models/index.js"); // models path depend on your structure
const fs = require ('fs');/* package 'file system' to access, modify and delete files */
const Posts = db.post;
const Users = db.user;
const Likes = db.like;
const Comments = db.comment;

// Creating a post controller
exports.createPost = (req, res) => {  
    // If an image has been uploaded or not, set req.body.imageUrl
    if (req.file) {
        req.body.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
    } else {
        req.body.imageUrl=null; 
    }
    const post = {
        userId: req.body.userId,
        content: req.body.postContent,
        imageUrl: req.body.imageUrl
    };

    // Create post in database
    Posts.create(post)
    .then(data => {
        res.send(data);            
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the post."
        });
    });
};

// Retrieving all posts controller
exports.findPost = (req, res) => {
    
    Posts.findAll({
        order: [['createdAt', "DESC"], ['updatedAt', "DESC"]],
        include: [Users, Likes, Comments]
    })
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

// Retrieving posts from one user controller
exports.findAllPostsOneUser = (req, res) => {

    Posts.findAll({ 
        where: { userId: req.params.id },
        order: [['createdAt', "DESC"], ['updatedAt', "DESC"]],
        include: [Users, Likes, Comments]
    })    
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

// Deleting a post controller
exports.deletePost = (req, res) => {
    const id = req.params.id;
    
    Posts.findOne({ 
        where: { id: id } 
    })
    .then(post => {     
        // If an image is part of the post, delete the image from the folder
        if (post.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { /* deleting the image file from the folder 'images' */
                deletePost(id);                
            })
        } else {
            deletePost(id); 
        }
    })
    .catch(error => res.status(500).json({ error }));  

    // Function to delete a post from database
    function deletePost(postId) {
        Posts.destroy({
            where: { id: postId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete post with id=${id}. Maybe post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete post with id=" + id
            });
        });
    }
  };

// Modifying a post controller
exports.updatePost = (req, res) => {
    const id = req.params.id;
    // If an image has been uploaded or not, set the data that will be sent for modification
    let post ={}
    if (req.file) {
        post = {
            content: req.body.postContent,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
        };
    } else {
        post = {
            content: req.body.postContent
        };
    }

    Posts.update(post, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Post was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating post with id=" + id
        });
    });
};
