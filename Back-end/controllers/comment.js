const bcrypt = require('bcrypt');/* package bcrypt to hash elements */
const jwt = require('jsonwebtoken');/* jsonwebtoken plugin enabling to generate tokens for autentication purposes */
const db = require("../models/index.js"); // models path depend on your structure
const fs = require ('fs');/* package 'file system' to access, modify and delete files */
const Posts = db.post;
const Users = db.user;
const Comments = db.comment;

// Creating a comment controller
exports.commentCreation = (req, res, next) => {  
    // If an image has been uploaded or not, set req.body.imageUrl
    if (req.file) {
        req.body.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
    } else {
        req.body.imageUrl=null; 
    }  
    const comment = {
        userId: req.body.userId,
        postId: req.params.id,
        commentContent: req.body.commentContent,
        imageUrl: req.body.imageUrl
    } 
   
    Comments.create(comment)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while creating the comment."});
    });
};


// Retrieving comments from one post controller
exports.findAllComments = (req, res) => {
    
    Comments.findAll({
        order: [['createdAt', "ASC"], ['updatedAt', "ASC"]], /* Order the comments by creating date first in ascendent, and updating date in second */
        include: [Users, Posts]
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

// Deleting a comment controller
exports.deleteComment = (req, res) => {
    const id = req.params.id; 

    Comments.findOne({
        where: { id: id }
    })
    .then(comment => {
        if (comment.imageUrl) {
            const filename = comment.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { /* deleting the image file from the folder 'images' */
                deleteComment(id);                
            })
        } else {
            deleteComment(id);
        }
    })
    .catch(error => res.status(500).json({ error }));      

    // Function to delete a comment
    function deleteComment(commentId){
        Comments.destroy({
        where: { id: commentId } /* find the comment by its id */
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
    }
};

// Modifying a comment controller
exports.updateComment = (req, res) => {
    const id = req.params.id;
    
    let comment ={}
    if (req.file) {
        comment = {
            commentContent: req.body.commentContent,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/* Creating the image URL */ 
        };
    } else {
        comment = {
            commentContent: req.body.commentContent
        };
    }
    
    Comments.update(comment, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Comment was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating post with id=" + id
        });
    });
};