import React from "react";
import style from "./Banner.module.css";
import imagenUno from "../../images/bannerUno.png";

const Banner = () => {
    return(

        <header className={style.container_Header}>
            <div className={style.container_div}>
                <img className={style.img_banner} src={imagenUno} alt="presentacion de inviatcion" loading="lazy" />
            </div>

            <p className={style.parrafo}>POR FAVOR CONSULTE A CONTINUACIÓN ANTES DEL 30 DE JUNIO DE 2023</p>

        </header>
    )
}

export default Banner