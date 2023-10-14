import React from "react";
import style from "./Error.module.css";

const Error = () => {
    return (
        <div className={style.container}>

            <div className={style.error}>
                <p className={style.error_parrafo}>
                    404 NOT FOUNTD
                </p>
            </div>

        </div>
    )
}

export default Error