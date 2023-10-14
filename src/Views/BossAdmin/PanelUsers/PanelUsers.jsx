import React, { useEffect, useState } from "react";
import style from "./PanelUsers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GetUsers, GenerateExcel, Logout, RefreshToken } from "../../../Redux/action.js";
import iconoWasa from "../../../images/whatsapp.png";
import asiste from "../../../images/comprobado.png";
import noAsiste from "../../../images/cancelar.png";
import masInfo from "../../../images/advertencia.png";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination/pagination";
import exit from "../../../images/salida.png";
import excel from "../../../images/sobresalir.png";
//import reset from "../../images/flecha-circular.png";

const PanelUsers = ({user, socket }) => {
    

    //socket.on("server:getUser", (dataUser) => {
    //    console.log(dataUser)
    //})

    useEffect(() => {
        const handleRes = (rpta) => {
          setDatoSocket((prevDatoSocket) => [...prevDatoSocket, rpta])
        };
    
        socket.on("res", handleRes);
    
        // Limpia el manejador de eventos cuando el componente se desmonta.
        return () => {
          socket.off("res", handleRes);
        };
    }, [socket]);

    useEffect(() => {
        const handleRes = (dataUser) => {
          //console.log(dataUser);

            if (typeof dataUser === "string") {
                setSocketError(dataUser)
            } else{
                setDatoSocket(dataUser)
            }
        };
    
        socket.on("server:getUser", handleRes);
    
        // Limpia el manejador de eventos cuando el componente se desmonta.
        return () => {
          socket.off("server:getUser", handleRes);
        };
    }, [socket]);

    const [ datoSocket, setDatoSocket ] = useState([])
    const [ errorSocket, setSocketError ] = useState()

    // datos de los usuarios

    const datosUsers = useSelector((state) => state.user)
    //const refreshToken = useSelector((state) => state.refresh)
    const error = useSelector((state) => state.error)

    //paginacion de panel

    const [ data, setData ] = useState(5)
    const [ page, setPage ] = useState(1)

    const indexFin = page * data
    const indexIni = indexFin - data

    const numPages = datoSocket ? Math.ceil(datoSocket.length / data) : []

    const dataPagination = datoSocket ? datoSocket.slice(indexIni, indexFin) : [];

    //console.log(dataPagination, "esto es de la paginacion")
    //console.log(numPages)

    const dispatch = useDispatch()

    const [totalNumberGuests, setTotalNumberGuests] = useState(0);
    const [totalMeatDishes, setTotalMeatDishes] = useState(0)
    const [totalChickenDishes, setTotalChickenDishes] = useState(0)
    const [totalFishDishes, setTotalFishDishes] = useState(0)
    const [accept, setAccept] = useState(0)
    const [reject, setReject] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        socket.emit("client:getUser")
    }, [])

    //useEffect(() => {
//
    //    dispatch(GetUsers())
//
    //}, [dispatch])

    useEffect(() => {
        if (datoSocket) {
          const suma = datoSocket.reduce((total, result) => total + result.numberGuests, 0);
          setTotalNumberGuests(suma);

            const sumaDos = datoSocket.reduce((acumalator, currentValue) => acumalator + currentValue.meatDishes, 0)
            setTotalMeatDishes(sumaDos)

            const sumaTres = datoSocket.reduce((acumulator, resultDos) => acumulator + resultDos.chickenDishes, 0)
            setTotalChickenDishes(sumaTres)

            const sumaCuatro = datoSocket.reduce((acumulador, resultTres) => acumulador + resultTres.fishDishes, 0)
            setTotalFishDishes(sumaCuatro)

            const sumaAccept = datoSocket.reduce((acumulador, resultData) => {
                if (resultData.accept) {
                  return {
                    aceptados: acumulador.aceptados + 1,
                    rechazados: acumulador.rechazados,
                  };
                } else {
                  return {
                    aceptados: acumulador.aceptados,
                    rechazados: acumulador.rechazados + 1,
                  };
                }
            }, { aceptados: 0, rechazados: 0 });

            setAccept(sumaAccept.aceptados)
            setReject(sumaAccept.rechazados)
        }
    }, [datoSocket]);


    //const resetGetUser = () => {
    //    dispatch(GetUsers())
    //    console.log('peticion por boton')
    //}

    const generateExcel = () => {
        dispatch(GenerateExcel())
        console.log('excel generado')
    }

    const HandleLogout = async () => {
        try {

            // Primero, borra el elemento del localStorage
            localStorage.removeItem("user");

            // Luego, realiza la acción de logout a través del dispatch
            await dispatch(Logout());

            // Finalmente, navega a la página de loginAdmin
            navigate("/loginAdmin");
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante el proceso de logout
            console.error("Error during logout:", error);
        }
    }

    return(

        <div className={style.container_container}>

            <div className={style.container_welcome}>

                <nav className={style.navbar_admin}>
                    <div className={style.name_admin}>
                        <h3 style={{color: "#fff"}} > Hello {user?.name} {user?.lastName} </h3>
                    </div>
                    {
                        //<div className={style.logout_admin}>
                        //    <div className={style.btn_logout} style={{cursor : 'pointer'}} onClick={() => HandleLogout()}>
                        //        <img src={exit} alt="exit" width="40px" height="40px" />
                        //    </div>
                        //</div>
                    }

                </nav>

            </div>

            <br/>

            <div className={style.container_Info_General}>

                <div className={style.container_invites}>
                    <h6 className={style.title}>Invites</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{totalNumberGuests}</p>
                    </div>
                </div>

                <div className={style.container_accept}>
                    <h6 className={style.title}>Accepted</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{accept}</p>
                    </div>
                </div>

                <div className={style.container_rejected}>
                    <h6 className={style.title}>Rejected</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{reject}</p>
                    </div>
                </div>

            </div>

            <br/>

            <div className={style.container_Info_General}>

                <div className={style.container_meat}>
                    <h6 className={style.title}>Meat Dishes</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{totalMeatDishes}</p>
                    </div>
                </div>

                <div className={style.container_chicken}>
                    <h6 className={style.title}>Chicken Dishes</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{totalChickenDishes}</p>
                    </div>
                </div>

                <div className={style.container_fish}>
                    <h6 className={style.title}>Fish Dishes</h6>
                    <div className={style.container_numerico}>
                        <p className={style.titleDos}>{totalFishDishes}</p>
                    </div>
                </div>

            </div>

            <br/>

            <div className={style.container_buttons} >

                <div className={style.container_Uno}>
                    {
                        //<div className={style.container_reset}>
                        //    <button className={style.reset} onClick={() => resetGetUser()}>
                        //        RESET <img width="15px" height="15px" src={reset} alt="logo reset" />
                        //    </button>
                        //</div>
                    }

                    {
                        //<div className={style.container_excel}>
                        //    <button className={style.excel} onClick={generateExcel}>
                        //        <img src={excel} alt="excel" width="25px" height="25px" />
                        //    </button>
                        //</div>
                    }


                </div>

            </div>

            {

                dataPagination.length > 0 ? (

                    <div className={style.container_admin}>

                        <div className={style.container_panel_admin}>

                            <div className={style.container_excel}>
                                <button className={style.excel} onClick={generateExcel}>
                                    <img src={excel} alt="excel" width="25px" height="25px" />
                                </button>
                            </div>

                            <table className={style.container_panel_table}>
                                <thead className={style.container_options_columns}>
                                    <tr className={style.container_options} >
                                      <th scope="col">ID</th>
                                      <th scope="col">NAME</th>
                                      <th scope="col">EMAIL</th>
                                      <th scope="col">PHONE</th>
                                      <th scope="col">ACCEPT</th>
                                      <th scope="col">MORE INFORMATION</th>
                                    </tr>
                                </thead>

                                <tbody className={style.container_general}>
                                    {
                                        dataPagination.map((result, index) => {
                                            return(

                                                <tr className={style.container_info} key={result.id}>
                                                    <td className={style.general}>{result.id}</td>
                                                    <td className={style.general}>{result.name}</td>
                                                    <td className={style.general}>{result.email}</td>
                                                    <td className={style.general}> <Link to={`https://wa.me/${result.phone}`} target="BLANK" ><img width="30px" height="30px" src={iconoWasa} alt="icono" /></Link> </td>
                                                    <td className={style.general}>
                                                      { result.accept ? ( <img width="30px" height="30px" src={asiste} alt="Asiste"/> ) : ( <img width="30px" height="30px" src={noAsiste} alt="no Asiste"/> ) }
                                                    </td>
                                                    <td className={style.general}><img onClick={
                                                      () => Swal.fire({
                                                          title: 'Informacion del Invitado',
                                                          icon: 'info',
                                                          html: `
                                                            <p>ID: ${result.id}</p>
                                                            <p>Name: ${result.name}</p>
                                                            <p>Phone: ${result.phone}</p>
                                                            <p>Email: ${result.email}</p>
                                                            <p>Name Guests: ${
                                                                result.nameGuests.length === 0 ? "Ausente" : result.nameGuests
                                                            }</p>
                                                            <p>Numero de Invitados: ${result.numberGuests}</p>
                                                            <p>Alergias: ${
                                                                result.allergies.length === 0 ? "No hay alergias" : result.allergies
                                                            }</p>
                                                            <p>Platos de Carne: ${result.meatDishes}</p>
                                                            <p>Platos de Pollo: ${result.chickenDishes}</p>
                                                            <p>Platos de Pescado: ${result.fishDishes}</p>
                                                          `,
                                                          showCloseButton: true,
                                                          showCancelButton: false,
                                                          focusConfirm: false,
                                                          confirmButtonText:
                                                            'OK',
                                                          confirmButtonAriaLabel: 'Thumbs up, great!',
                                                          cancelButtonText:
                                                            '<i class="fa fa-thumbs-down"></i>',
                                                          cancelButtonAriaLabel: 'Thumbs down'
                                                      })
                                                    } width="30px" height="30px" style={{cursor:"pointer"}} src={masInfo} alt="mas Info"/></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>

                            <Pagination
                                setcurrentPage={setPage}
                                currentPage={page}
                                numPages={numPages}
                            />

                        </div>
                        
                    </div>

                ) : (

                    errorSocket ? (
                        <div className={style.container_error}>
                            <h4 className={style.error_message} >{errorSocket}</h4>
                        </div>
                    ) : (
                        <div className={style.container_info_Dos}>
                            <div colSpan="6" className={style.container_carga}>
                              <div className={style.spinner}></div>
                              <p>Cargando...</p>
                            </div>
                        </div>
                    )

                )

            }

        </div>

    )
}

export default PanelUsers