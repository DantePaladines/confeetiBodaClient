import React, { useState, useEffect } from "react";
import style from "./BossAdmin.module.css";
import CreateAdmin from "./CreateAdmin/createAdmin.jsx";
import Admins from "./Admins/admins.jsx";
import PanelUsers from "./PanelUsers/PanelUsers.jsx";
import barraDeNavegacion from "../../images/barra-de-menus.png";
import salir from "../../images/salida.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutBossAdmin } from "../../Redux/action";

const BossAdmin = ({ userBoss, socket}) => {

    const [mostrarAdmins, setMostrarAdmins] = useState(true);
    const [mostrarCreateAdmin, setMostrarCreateAdmin] = useState(false);
    const [mostrarPanelUsers, setMostrarPanelUsers] = useState(false);

    const mostrarComponente = (componente) => {
        setMostrarAdmins(false);
        setMostrarCreateAdmin(false);
        setMostrarPanelUsers(false);
    
        if (componente === "admins") {
          setMostrarAdmins(true);
        } else if (componente === "createAdmin") {
          setMostrarCreateAdmin(true);
        } else if (componente === "panelUsers") {
            setMostrarPanelUsers(true);
        }
    };

    //const [ component, setComponent ] = useState(true)
    const [ navbar, setNavbar ] = useState(false)
    const [isNavVisible, setNavVisible] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //const changeComponent = () => {
    //    setComponent(true)
    //}
//
    //const changeComponentTwo = () => {
    //    setComponent(false)
    //}
//
    const toggleNav = () => {
        setNavVisible(!isNavVisible);
    };
    
    // falta adaptar al telefono

    const HandleLogoutAdminBoss = async () => {
        try {
            // Primero, borra el elemento del localStorage
            localStorage.removeItem("userBossAdmin");

            // Luego, realiza la acción de logout a través del dispatch
            await dispatch(LogoutBossAdmin());

            // Finalmente, navega a la página de loginAdmin
            navigate("/loginBossAdmin");
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante el proceso de logout
            console.error("Error during logout:", error);
        }
    }

    return(
        <div className={style.container} >

            <div className={`${style.vertical_navbar} ${isNavVisible ? "" : style.hidden}`}>

                <h6 className={style.nameCreator} > Hello {userBoss?.name} {userBoss?.lastName} </h6>
            
                <ul className={style.container_options}>
                  <li><a href="/" >Inicio</a></li>
                  <li><a style={{cursor:'pointer'}} onClick={() => mostrarComponente("admins")} >Administrators Panel</a></li>
                  <li><a style={{cursor:'pointer'}} onClick={() => mostrarComponente("panelUsers")} >User Panel</a></li>
                  <li><a style={{cursor:'pointer'}} onClick={() => mostrarComponente("createAdmin")} >Creation of Administrators</a></li>
                </ul>

                <div className={style.container_logout}>
                    <a className={style.logout} onClick={HandleLogoutAdminBoss}>
                        <img src={salir} title="LOGOUT" width="40px" height="40px" alt="cerrar sesion" />
                    </a>
                </div>
            </div>

            <div className={ isNavVisible ? style.container_createAdmin : style.container_createAdmin_two} >

                <div>
                    <p className={style.button_barra}>
                        <img src={barraDeNavegacion} onClick={toggleNav} style={{cursor:'pointer'}} alt="barra de Navegacion" width="35px" height="35px" />
                    </p>
                </div>


                {mostrarAdmins && <Admins socket={socket} />}
                {mostrarCreateAdmin && <CreateAdmin socket={socket} />}
                {mostrarPanelUsers && <PanelUsers user={userBoss} socket={socket} />}

                {
                    //component ? (
                    //    <Admins socket={socket} />
                    //) : (
                    //    <CreateAdmin socket={socket} />
                    //)
                }
            </div>

        </div>


    )
}

export default BossAdmin