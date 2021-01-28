const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); /* import the codes from controllers/user */
const auth = require('../middleware/auth');/* import code to manage tokens */
const multer = require('../middleware/multer-config');/* import code to manage images */
const adminVerif = require('../middleware/adminVerif');/* import code to authorize Admin and correct userID */

router.post('/login', userCtrl.login);
router.post('/signup', multer, userCtrl.signup);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.findAllUsers);
router.put('/:id', auth, multer, adminVerif, userCtrl.updateUser);
router.delete('/:id', adminVerif, userCtrl.deleteUser);

module.exports = router;