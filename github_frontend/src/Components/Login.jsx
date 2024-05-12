import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react";
import alertContext from "../Context/alerts/alertContext";
import authContext from "../Context/auth/authContext";

const Login = () => {
    const loginContext = useContext(authContext);
    const { loginFunc, setUsername } = loginContext;


    const context = useContext(alertContext);
    const { showAlert } = context;

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const nevigate = useNavigate();

    const getValues = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let errMsg = "";

        if (!regex.test(credentials.email)) {
            errMsg = "Enter valid a valid email format";
        } else if (credentials.password.length < 4) {
            errMsg = "Password must be more than 4 characters"
        } else if (credentials.password.length > 10) {
            errMsg = "Password must be less than 10 characters"
        }
        if (errMsg) {
            showAlert("danger", errMsg, 3000);
        }

        if (errMsg === "") {
            const response = await loginFunc(credentials.email, credentials.password);

            if (response.success) {
                // save auth token & redirect home page
                localStorage.setItem("name", response?.data?.name);
                console.log('response?.data?.name: ', response?.data?.name);
                setUsername(response?.data?.name);
                localStorage.setItem("token", response?.data?.accessToken);
                showAlert("success", "Logged in successfully", 3000);
                nevigate("/");
            } else {
                showAlert("danger", response?.message, 3000);
                nevigate("/login");
            }
        }
    }

    return (
        <>
            <div className="main">
                <div className="formClass">

                    <h2 className="formTitle">Login</h2>
                    <label className="formLabel" htmlFor="email">Email ID:</label>
                    <input className="formInput" type="email" id="email" name="email" required onChange={getValues} />

                    <label className="formLabel" htmlFor="password">Password:</label>
                    <input className="formInput" type="password" id="password" name="password" required onChange={getValues} />

                    <div className="btnContainer">
                        <button disabled={credentials.email.length < 1 || credentials.password.length < 1} className="btn" onClick={loginHandler}><i className="fas fa-sign-in-alt"></i>Login</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
