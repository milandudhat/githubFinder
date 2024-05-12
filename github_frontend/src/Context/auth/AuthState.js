import { useState } from "react";
import AuthContext from "./authContext";
const { SERVER_URL } = require("../../config/config");

const AuthState = (props) => {
    const [username, setUsername] = useState(localStorage.getItem("name") || "");

    const loginFunc = async (email, password) => {
        let result = await fetch(`${SERVER_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
        result = await result.json();
        return result
    }

    const registerFunc = async (name, email, password) => {
        let result = await fetch(`${SERVER_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        result = await result.json();
        return result
    }

    const getUser = async () => {
        let result = await fetch(`${SERVER_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        result = await result.json();
        return result
    }


    return (
        <AuthContext.Provider value={{ loginFunc, registerFunc, getUser, username, setUsername }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;