const CryptoJS = require("crypto-js");
const md5 = require("md5");
const key = CryptoJS.SHA256(process.env.ENC_KEY);
const iv = CryptoJS.enc.Base64.parse("");
const jwt = require("jsonwebtoken");
const { z, ZodError } = require('zod');
const APIResponseFormat = require("../utils/APIResponseFormat");

const userSchemasignup = z.object({
    name: z
        .string({
            required_error: "Full name is required",
        })
        .nonempty(),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Not a valid email"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password too short"),
});

const userSchemalogin = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Not a valid email"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password too short"),
})

module.exports = {
    encrypt: (dataToEncrypt) => {
        const data =
            typeof dataToEncrypt === "string"
                ? dataToEncrypt
                : JSON.stringify(dataToEncrypt);

        return CryptoJS.AES.encrypt(data, key, {
            keySize: 32,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
    },

    decrypt: (encryptString) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptString, key, {
                keySize: 32,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });

            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    generateSalt: (length) => {
        var char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var password = "";

        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * char.length);
            password += char.charAt(randomIndex);
        }

        return password;
    },

    hashPassword: (password, salt) => {
        const hashedPassword = md5(password + salt);
        return hashedPassword;
    },

    generateToken: (payload) => {
        const token = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE, }
        );
        return token;
    },

    decodeToken: (token) => {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    },


    validateUserSchemaSignup : (req, res, next) => {
        try {
            userSchemasignup.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // res.status(400).json({ error: 'Validation failed', details: error.errors });
                return APIResponseFormat._ResError(res, error.errors[0].message);
            } else {
                next(error);
            }
        }
    },

    validateUserSchemalogin : (req, res, next) => {
        try {
            userSchemalogin.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                // res.status(400).json({ error: 'Validation failed', details: error.errors });
                return APIResponseFormat._ResError(res, error.errors[0].message);
            }
            else {
                next(error);
            }
        }
    }




};
