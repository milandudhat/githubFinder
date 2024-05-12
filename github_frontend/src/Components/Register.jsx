import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../Context/alerts/alertContext";
import authContext from "../Context/auth/authContext";

const Register = () => {

    const registerContext = useContext(authContext);
    const { registerFunc } = registerContext;

    const context = useContext(alertContext);
    const { showAlert } = context;

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const nevigate = useNavigate();

    const getValues = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        // console.log(credentials);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let errMsg = "";

        if (!regex.test(credentials.email)) {
            errMsg = "Enter valid a valid email format";
        } else if (credentials.password.length < 4) {
            errMsg = "Password must be more than 4 characters"
        } else if (credentials.password.length > 10) {
            errMsg = "Password must be less than 10 characters"
        } else if (credentials.password !== credentials.cpassword) {
            errMsg = "Password and Confirm password must be same"
        }
        if (errMsg) {
            showAlert("danger", errMsg, 3000);
        }
        if (errMsg === "") {
            const response = await registerFunc(credentials.name, credentials.email, credentials.password);
            if (response.success) {
                console.log('response: ', response);
                showAlert("success", "User registered successfully", 3000)
                nevigate("/login");
            } else {
                showAlert("danger", response.message, 3000)
            }
        }


    }

    return (
        <>
            <div className="main">
                <div className="formClass">

                    <h2 className="formTitle">Create an Account</h2>

                    <label className="formLabel" htmlFor="name">Name:</label>
                    <input className="formInput" type="email" id="name" name="name" required onChange={getValues} />

                    <label className="formLabel" htmlFor="email">Email ID:</label>
                    <input className="formInput" type="email" id="email" name="email" required onChange={getValues} />

                    <label className="formLabel" htmlFor="password">Password:</label>
                    <input className="formInput" type="password" id="password" name="password" required onChange={getValues} />

                    <label className="formLabel" htmlFor="cpassword">Confirm Password:</label>
                    <input className="formInput" type="password" id="cpassword" name="cpassword" required onChange={getValues} />

                    <div className="btnContainer">
                        <button disabled={credentials.email.length < 1 || credentials.password.length < 1} className="btn" onClick={registerHandler}><i className="fas fa-sign-in-alt"></i>Sign Up</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register