const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post'); /* import the codes from controllers/user */
const auth = require('../middleware/auth');/* import code to manage tokens */
const multer = require('../middleware/multer-config');/* import code to manage images */
const adminVerif = require('../middleware/adminVerif');/* import code to authorize Admin and correct userID */

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.findPost);
router.get('/:id', auth, postCtrl.findAllPostsOneUser);
router.delete('/:id', adminVerif, postCtrl.deletePost);
router.put('/:id', auth, multer, adminVerif, postCtrl.updatePost);

module.exports = router;