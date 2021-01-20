const bcrypt = require('bcrypt');/* package bcrypt to hash elements */
const jwt = require('jsonwebtoken');/* jsonwebtoken plugin enabling to generate tokens for autentication purposes */
const db = require("../models/index.js"); // models path depend on your structure
const Posts = db.post;
const Users = db.user;
const Likes = db.like;

// Liking/Disliking a post controller
exports.likePost = (req, res, next) => {
    const userId = req.body.userId;
    const postId = req.params.id;
    const reaction = req.body.reaction;

    // If the user has previously reacted to the post
    Likes.findOne({ 
        where: { 
            userId: userId, 
            postId: postId 
        }
    })
    .then(likeUserPost => {
        const likeToModify = likeUserPost.dataValues.id;
            // Function to update the like status of the post
            function updateOrDestroyLike (likeOrDislikeReaction, dataToUpdate) {
                // If user clicks on the same button as he already did (like or dislike)
                // the reaction is cancelled (the like/dislike is destroyed)
                if(likeOrDislikeReaction == true) {
                    Likes.destroy({
                        where: { id: likeToModify }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({message: "Le like du post a été retiré."});
                        } else {
                            res.send({message: `Cannot update like with id=${likeToModify}.`});
                        }
                    })
                    .catch(err => {
                        res.status(500).send({message: "Error updating like with id=" + likeToModify});
                    });
                // If user clicks on the other button as he already did (like or dislike)
                // the reaction is updated (like/dislike set to false and the other set to true)
                } else if(likeOrDislikeReaction == false) {
                    Likes.update(dataToUpdate, {
                        where: { id: likeToModify }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({message: "Le like du post a été modifié."});
                        } else {
                            res.send({message: `Cannot update like with id=${likeToModify}.`});
                        }
                    })
                    .catch(err => {
                        res.status(500).send({message: "Error updating like with id=" + likeToModify});
                    });
                }
            }
        // Call the fFunction to update the like status depending on the reaction (like/dislike)
        if(reaction == 'likeReaction' ) {
            updateOrDestroyLike(likeUserPost.dataValues.likeReaction, {likeReaction: true, dislikeReaction: false});
        } else if(reaction == 'dislikeReaction' ){
            updateOrDestroyLike(likeUserPost.dataValues.dislikeReaction, {dislikeReaction: true, likeReaction: false});
        }        
    })
    
    // If the user hasn't already reacted to the post, we create a line in the 'likes' table
    .catch(error => {
        let likeElementsForCreation = null;  
        if(reaction == 'likeReaction' ) {
            likeElementsForCreation = {
                userId: userId,
                postId: postId,
                likeReaction: true, 
                dislikeReaction: false
            };   
        } else if(reaction == 'dislikeReaction' ){
            likeElementsForCreation = {
                userId: userId,
                postId: postId,
                likeReaction: false, 
                dislikeReaction: true
            }; 
        }              
        Likes.create(likeElementsForCreation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while creating the user."});
        });    
    });       
};

// Retrieving likes/dislikes from one post controller
exports.findAllLikes = (req, res) => {

    Likes.findAll({
        include: [Users]
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