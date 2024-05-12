import { useState } from "react";
import GithubContext from "./githubContext";
const { SERVER_URL } = require("../../config/config");
const GithubState = (props) => {
    // syantax = fetch(url, {method, headers, body});

    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState("");
    const [lodder, setLodder] = useState();

    const getGithubRepos = async (username) => {
        setLodder(true);
        const headerObj = {
            // "islogin": false
        };

        const token = localStorage.getItem("token");
        if (token) {
            // headerObj["islogin"] = true;
            headerObj["authorization"] = `Bearer ${token}`;
        }

        let result = await fetch(`${SERVER_URL}/github/repos/${username}`, {
            method: "GET",
            headers: headerObj
        })
        result = await result.json();
        // console.log(result);
        return result
    }

    const bookMarkUpdate = async (repoid) => {
        const headers = {
            "repoid": repoid,
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }

        let result = await fetch(`${SERVER_URL}/github/bookmark`, {
            method: "PUT",
            headers: headers
        })
        result = await result.json();
        return result;
    }

    return (
        <GithubContext.Provider value={{ repos, setRepos, getGithubRepos, bookMarkUpdate, lodder, setLodder, search, setSearch }}>
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;