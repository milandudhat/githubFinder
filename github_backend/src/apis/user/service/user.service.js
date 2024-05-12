const db = require("../../../database/models");
const md5 = require("md5");
const User = db.user;


const signup = async (user) => {
    try {

        user.password = md5(user.password)
        const createdUser = await User.create(user);

        // remove password from response
        delete createdUser.dataValues.password

        return createdUser
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        return user
    }
    catch (error) {
        throw error
    }
}

const comparePassword = async (password) => {
    try {
        const isPasswordCorrect = await User.findOne({
            where: {
                password : md5(password)
            }
            ,
            attributes : {
                exclude : ['password', 'deletedAt']
            }
        })

        // console.log(isPasswordCorrect);

        return isPasswordCorrect
    }
    catch (error) {
        throw error
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id
            },
            attributes : {
                exclude : ['password', 'deletedAt']
            }
        })

        return user
    }
    catch (error) {
        throw error
    }
}


module.exports = {
    signup,
    getUserByEmail,
    comparePassword,
    getUserById,
}