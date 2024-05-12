import React, { useContext } from 'react'
import alertContext from '../Context/alerts/alertContext'

const Alert = (props) => {

    const context = useContext(alertContext);
    const { alert } = context;

    return (
        <>
            {
                alert &&
                <div className={`alert alert-${alert.type}`}>
                    <strong className="msg">{alert.msg}</strong>
                </div>
            }
        </>
    )
}

export default Alert