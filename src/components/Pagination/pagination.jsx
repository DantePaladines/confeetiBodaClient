import React from "react";
import siguiente from "../../images/derecha.png";
import style from "../../Views/Dashboard/Adm.module.css";

const Pagination = ({numPages, currentPage, setcurrentPage}) => {

    const prevt = () => {
        if(currentPage !== 1) {
            setcurrentPage(currentPage - 1)
        }
    }

    const next = () => {
        if (currentPage !== numPages) {
            setcurrentPage(currentPage + 1)
        }
    }

    return(
        <>
            <div className={style.container_pagination}>

                <div className={style.pagination}>
                    <h4 onClick={prevt} style={{cursor : "pointer"}} className={style.container_prevt}>
                        <img width="30px" height="30px" src={siguiente} alt="" className={style.paginationIzquierda} />
                    </h4>

                    <h5 className={style.container_number_pagination}>{currentPage} / {numPages}</h5>

                    <h4 onClick={next} style={{cursor : "pointer"}} className={style.container_next}>
                        <img width="30px" height="30px" src={siguiente} alt="" />
                    </h4>
                </div>

            </div>
        </>
    )
}

export default Pagination