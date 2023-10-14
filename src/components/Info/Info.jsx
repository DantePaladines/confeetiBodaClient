import React from "react";
import style from "./Info.module.css";
import imgDos from "../../images/infoEvent.png";

const Info = () => {
    return (
        <main className={style.container_main}>
            <div className={style.container_div_info}>
                <img className={style.img_info_event} src={imgDos} alt="info de evento" loading="lazy" />
            </div>
        </main>
    )
}

export default Info