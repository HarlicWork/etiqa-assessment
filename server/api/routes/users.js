const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const usersController = require('../controllers/usersController');

router.get('/', usersController.user_get_all);

router.get('/:id', usersController.user_get_by_id);

router.post('/signup', usersController.users_signup);

router.post('/login', usersController.users_login);

router.put('/update/:id', usersController.users_update);

router.post('/logout', usersController.users_logout);

router.delete('/:userId', usersController.users_delete);

module.exports = router;
