const db = require("../../../database/models");
const md5 = require("md5");
const User = db.user;
const Star = db.star;
const axios = require('axios');




module.exports = {
    getGithubUser: async (username) => {
        try {
            const githubUser = await axios.get(`https://api.github.com/users/${username}`);
            if (!githubUser.data) {
                return null
            }
            const resUser = {
                id: githubUser.data.id,
                username: githubUser.data?.login,
                name: githubUser.data?.name,
                avatar_url: githubUser.data?.avatar_url,
                public_repos: githubUser.data?.public_repos,
                bio: githubUser.data?.bio,
                followers: githubUser.data?.followers,
                following: githubUser.data?.following,
            }

            return resUser;
        } catch (error) {
            // if(error.code === "ERR_BAD_REQUEST") {
            //     throw new Error('GITHUB_API_RATE_LIMIT_EXCEEDED');
            // }
            console.error('Error fetching user:', error);
            throw error
        }
    },

    getGithubRepo: async (username, userid) => {
        console.log('userid: ', userid);
        try {
            let stars = [];
            if (userid) {
                stars = await Star.findAll({
                    where: {
                        userid
                    }
                }).then((data) => JSON.parse(JSON.stringify(data)))
            }

            const githubUserRepo = await axios.get(`https://api.github.com/users/${username}/repos`);
            if (!githubUserRepo.data) {
                return [];
            }

            const repositories = githubUserRepo.data.map((repo) => {
                return {
                    id: repo.id,
                    name: repo?.name,
                    description: repo?.description,
                    watchers_count: repo?.watchers_count,
                }
            });

            if (userid && stars.length > 0) {
                for (let i = 0; i < repositories.length; i++) {
                    let star = stars.find(star => star.repoid === repositories[i].id)
                    // console.log('star: ', star?.isstar);
                    repositories[i].is_star = star?.isstar === true ? true : false
                }
            }

            return repositories;
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error
        }
    },

    starRepo: async (repoid, userid) => {
        try {

            // console.log(repoid, userid);

            // find data with userid and repoid
            var star = await Star.findOne({
                where: {
                    repoid,
                    userid
                }
            }).then((data) => JSON.parse(JSON.stringify(data)))
            // console.log(star);

            if (star) {
                // update isstar
                await Star.update({
                    isstar: star.isstar === true ? false : true
                }, {
                    where: {
                        repoid,
                        userid
                    }
                })
                return true
            } else {
                // create new data
                star = await Star.create({
                    repoid,
                    userid,
                    isstar: true
                })
                return true
            }
        } catch (error) {
            console.log('error: ', error);
            throw error
        }
    }
}