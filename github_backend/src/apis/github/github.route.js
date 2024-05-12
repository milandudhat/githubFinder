const express = require('express');
const GithubController = require('./controller/github.controller.js');
const validateUserSchemaSignup = require('../../utils/helper.js').validateUserSchemaSignup;
const validateUserSchemalogin = require('../../utils/helper.js').validateUserSchemalogin;
const isSignedIn = require('../../middleware/isAuth.js').isSignedIn;

const router = express.Router();

router.get('/repos/:username', GithubController.getGithubRepo);

// isstar
router.put('/bookmark', isSignedIn, GithubController.starRepo);





module.exports = router