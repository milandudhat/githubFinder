const express = require('express');
const userRoutes = require('./user/user.route.js');
const githubRoutes = require('./github/github.route.js');
const APIResponseFormat = require('../utils/APIResponseFormat.js');

const router = express.Router();

router.get("/", (req, res) => {
    return APIResponseFormat._ResSuccess(res, "Welcome to the node-boiler-plate API...");
})

router.use("/users", userRoutes);
router.use("/github", githubRoutes);

router.use("*", (req, res) => {
    return APIResponseFormat._ResRouteNotFound(res);
})

const setRoutes = (app) => {
    app.use('/api/v1', router);
}

module.exports = setRoutes