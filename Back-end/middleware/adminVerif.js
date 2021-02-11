const jwt = require('jsonwebtoken');/* jsonwebtoken plugin enabling to manage tokens */
const db = require("../models/index.js"); // models path depend on your structure
const Users = db.user;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];/* look for the token located after the space in header 'authorization' */
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;/* get the userId linked to the token */
    Users.findOne({ where: { id: userId }})
    .then(user => {
      if(user.role == 'admin' || req.body.userId && parseInt(req.body.userId) == userId) {
        next();/* go to next function if valid user ID (Admin or the user that has created the post, comment or the user profile) */
      } else {
        throw 'Invalid user ID';
      }
    })
    .catch(error => res.status(401).json({ error }));    
    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};