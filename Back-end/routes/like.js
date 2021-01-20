const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like'); /* import the codes from controllers/user */
const auth = require('../middleware/auth');/* import code to manage tokens */

router.post('/:id', auth, likeCtrl.likePost);
router.get('/', likeCtrl.findAllLikes);

module.exports = router;