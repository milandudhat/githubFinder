import { useContext } from "react";
import { NavLink } from "react-router-dom";
import authContext from "../Context/auth/authContext";
import githubContext from "../Context/github/githubContext";
import alertContext from "../Context/alerts/alertContext";
// import alertContext from "../Context/alerts/alertContext";
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const nevigate = useNavigate();

    // const nevigate = useNavigate();
    const loginContext = useContext(authContext);
    const { username } = loginContext;

    const gContext = useContext(githubContext);
    const { setLodder, setRepos, getGithubRepos, search } = gContext;

    const context = useContext(alertContext);
    const { showAlert } = context;

    let auth = localStorage.getItem("token")

    const logoutFunc = async () => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");

        if (search.trim() !== "") {
            const responseRepo = await getGithubRepos(search.trim());
            if (responseRepo.success) {
                setLodder(false);
                setRepos(responseRepo?.data);

            } else {
                if (responseRepo.status === 403) {
                    showAlert("danger", "Github API rate limit exceeded. Please wait and try again later.", 3000);
                    setLodder("");
                } else {
                    showAlert("danger", "Github user not exists", 3000);
                    setLodder("");
                }
            }
        }

        nevigate("/");
    }

    return (
        <>
            <div className="header">
                <h1 id="logo"><i className="fa-brands fa-github"></i> Github Profile Finder</h1>
                <div className="navbar">
                    {
                        auth ?
                            <ul className="profileName">
                                <h6>{username ? `( ${username} )` : ""}</h6>
                                <p onClick={logoutFunc} ><i className="fas fa-sign-out-alt"></i>Logout</p>
                            </ul> :

                            <ul>
                                <NavLink aria-current="page" to="/login"><i className="fas fa-sign-in-alt"></i>Login</NavLink>
                                <NavLink className="nav-link ls-none" to="/register"><i className="fas fa-user-plus"></i>Sign Up</NavLink>
                            </ul>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar