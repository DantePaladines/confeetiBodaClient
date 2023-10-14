import React from "react";
import { Navigate } from "react-router-dom";

const ProtecteRouterBoss = ({ children, dataBoss, redirectTo="/loginBossAdmin"}) => {

    if (!dataBoss || !dataBoss.token) {
        //console.log(data)
        return <Navigate to={redirectTo} />

    }else {
        //console.log(data)
        return children
    }
}

export default ProtecteRouterBoss


//, redirectTo="/loginBossAdmin"