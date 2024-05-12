const express = require('express');
const UserController = require('./controller/user.controller.js');
const validateUserSchemaSignup = require('../../utils/helper.js').validateUserSchemaSignup;
const validateUserSchemalogin = require('../../utils/helper.js').validateUserSchemalogin;
const isSignedIn = require('../../middleware/isAuth.js').isSignedIn;

const router = express.Router();

router.post('/signup', validateUserSchemaSignup,  UserController.signup);
router.post('/login', validateUserSchemalogin,  UserController.login);
router.get('/me', isSignedIn, UserController.getProfile);

module.exports = router