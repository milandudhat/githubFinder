import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {

    const [alert, setAlert] = useState(null);

    const showAlert = (type, msg, time) => {
        setAlert({ type: type, msg: msg });
        setTimeout(() => {
            setAlert(null);
        }, time);
    }

    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;