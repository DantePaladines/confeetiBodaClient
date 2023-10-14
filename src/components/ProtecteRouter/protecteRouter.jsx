import React from "react";
import { Navigate } from "react-router-dom";

const ProtecteRouter = ({ children, data, redirectTo="/loginAdmin"}) => {

    if (!data || !data.token) {
        //console.log(data)
        return <Navigate to={redirectTo} />

    }else {
        //console.log(data)
        return children
    }
}

export default ProtecteRouter