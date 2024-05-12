const APIResponseFormat = require('../../../utils/APIResponseFormat.js');
const GithubService = require('../service/github.service.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { decodeToken } = require('../../../utils/helper.js');






module.exports = {
    getGithubRepo: async (req, res) => {
        try {
            const { username } = req.params;
            // let { islogin } = req.headers;
            // console.log('islogin: ', islogin);

            const token = req.headers["authorization"]
                ? req.headers["authorization"].trim().split(" ")[1]
                : null;
            // console.log('token: ', token);
            // if (!token) {
            //     return APIResponseFormat._ResError(res, "Token is required");
            // }

            const githubUser = await GithubService.getGithubUser(username);
            // console.log('githubUser: ', githubUser);
            if (!githubUser) {
                return APIResponseFormat._ResError(res, "Github User Not exists");
            }

            let githubRepos;
            if (token) {
                // console.log("with login");
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                // console.log('decoded: ', decoded);
                githubRepos = await GithubService.getGithubRepo(username, decoded?.id);
            } else {
                // console.log("without login");
                githubRepos = await GithubService.getGithubRepo(username, null);
            }

            return APIResponseFormat._ResSuccess(res, "User Github Repo fetched successfully!!!", {
                githubUser,
                githubRepos
            });
        } catch (error) {
            console.log('error: ', error);
            if(error.code === "ERR_BAD_REQUEST") {
                return APIResponseFormat._ResErrorLimitExceeded(res, "Github API rate limit exceeded. Please try again later.");
            }else{
                return APIResponseFormat._ResServerError(res);
            }
        }
    },

    starRepo: async (req, res) => {
        try {

            let { repoid } = req.headers;
            let userid = req.user.id

            if (!repoid) {
                return APIResponseFormat._ResError(res, "Repo Id is required");
            }

            const stardatachnage = await GithubService.starRepo(repoid, userid);
            // console.log('stardatachnage: ', stardatachnage);

            return APIResponseFormat._ResSuccess(res, "Bookmark updated successfully");
        } catch (error) {
            return APIResponseFormat._ResServerError(res, error);
        }
    }
}