const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment'); /* import the codes from controllers/user */
const auth = require('../middleware/auth');/* import code to manage tokens */
const multer = require('../middleware/multer-config');/* import code to manage images */
const adminVerif = require('../middleware/adminVerif');/* import code to authorize Admin and correct userID */

router.post('/:id', auth, multer, commentCtrl.commentCreation);
router.get('/', auth, commentCtrl.findAllComments);
router.delete('/:id', adminVerif, commentCtrl.deleteComment);
router.put('/:id', auth, multer, adminVerif, commentCtrl.updateComment);

module.exports = router;