import React, { useEffect, useState } from "react";
import style from "./admins.module.css";
import { useSelector, useDispatch } from "react-redux";
import { 
    GetUsersAdmins, 
//    GenerateExcel, 
//    Logout, 
//    RefreshToken, 
    DeleteUserAdmin, 
    UpdateUserAdmins
} from "../../../Redux/action.js";
//import iconoWasa from "../../../images/whatsapp.png";
//import asiste from "../../../images/comprobado.png";
//import noAsiste from "../../../images/cancelar.png";
//import masInfo from "../../../images/advertencia.png";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination/pagination";
//import exit from "../../../images/salida.png";
//import excel from "../../../images/sobresalir.png";
//import reset from "../../images/flecha-circular.png";
import cerrar from "../../../images/cerrar.png";
import tacho from "../../../images/tacho.png";
import update from "../../../images/actualizar.png";

const Admins = ({user, socket }) => {
    
    //socket.on("server:getUser", (dataUser) => {
    //    console.log(dataUser)
    //})

    useEffect(() => {
        const handleRes = () => {

            console.log("data")
            //setDatoSocket((prevDatoSocket) => [...prevDatoSocket, rpta])
        };
    
        socket.on("createAdmin:server", handleRes);
    
        // Limpia el manejador de eventos cuando el componente se desmonta.
        return () => {
          socket.off("createAdmin:server", handleRes);
        };
    }, [socket]);

    useEffect(() => {
        const handleRes = (datos) => {
            //console.log("data")
            setDatoSocket(datos)
        };
    
        socket.on("server:getAdmins", handleRes);
    
        // Limpia el manejador de eventos cuando el componente se desmonta.
        return () => {
          socket.off("server:getAdmins", handleRes);
        };
    }, [socket]);

    //useEffect(() => {
    //    const handleRes = (dataUser) => {
    //      //console.log(dataUser);
//
    //        if (typeof dataUser === "string") {
    //            setSocketError(dataUser)
    //        } else{
    //            setDatoSocket(dataUser)
    //        }
    //    };
    //
    //    socket.on("server:createAdmins", handleRes);
    //
    //    // Limpia el manejador de eventos cuando el componente se desmonta.
    //    return () => {
    //      socket.off("server:createAdmins", handleRes);
    //    };
    //}, [socket]);

    //useEffect(() => {
    //    const handleRes = (idToDelete) => {
    //      //console.log(dataUser);
    //        // mejorar este mas tarde
    //        //setDatoSocket((prevDatoSocket) => [prevDatoSocket])
    //        setDatoSocket((prevDatoSocket) => prevDatoSocket.filter((element) => element.id !== idToDelete));
//
    //        //if (typeof dataUser === "string") {
    //        //    setSocketError(dataUser)
    //        //} else{
    //        //    setDatoSocket(dataUser)
    //        //}
    //    };
    //
    //    socket.on("server:deleteAdmins", handleRes);
    //
    //    // Limpia el manejador de eventos cuando el componente se desmonta.
    //    return () => {
    //      socket.off("server:deleteAdmins", handleRes);
    //    };
    //}, [socket]);

    const [ datoSocket, setDatoSocket ] = useState()
    const [ errorSocket, setSocketError ] = useState()

    // datos de los usuarios

    const datosUsers = useSelector((state) => state.userAdminsPanel)
    const errorGet = useSelector((state) => state.errorGetUsers)
    //const error = useSelector((state) => state.error)

    useEffect(() => {
        if (errorGet) {
            setSocketError(errorGet)
        }
    }, [errorGet])

    //paginacion de panel

    const [ data, setData ] = useState(5)
    const [ page, setPage ] = useState(1)

    const indexFin = page * data
    const indexIni = indexFin - data

    const numPages = datosUsers ? Math.ceil(datosUsers.length / data) : []

    const dataPagination = datosUsers ? datosUsers.slice(indexIni, indexFin) : [];

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleDeleteAdmins = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "El Administrador se eliminará permanentemente en el sistema",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Administrador Eliminado',
                'Los datos del Admin han sido eliminados con exito',
                'success'
              )
                // muestra los datos
                //console.log(datos)
                //dispatch(PostResponse(datos))
                //loadResponse({datos, socket})

                //console.log(data)

                //socket.emit("client:DeleteUserAdmin", id)

                //console.log(id, "id del admin")
                dispatch(DeleteUserAdmin(id))

            }
        })
    }

    //==============================================================
    //==============================================================

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ errorSocketDos, setErrorSocket ] = useState(null)

    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ idUser, setIdUser ] = useState(null)

    // capturar de errores

    const [ nameError, setNameError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ lastNameError, setLastNameError ] = useState("")
    const [ emailError, setEmailError ] = useState("")

    //const navigate = useNavigate()

    //const admin = useSelector((state) => state.userAdmin)

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // validando funciones
    const namePattern = RegExp(/^[a-zA-Z ,]+$/)
    const passwordPattern = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/);
    const emailPattern = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const valdateName = () => {
        if (!name) {
            return "Require Name";
        }else if (!namePattern.test(name)) {
            return "User is invalidate";
        }
        return ""
    }

    const validateLastName = () => {
        if (!lastName) {
            return "Require LastName";
        }else if (!namePattern.test(lastName)) {
            return "LastName is invalidate";
        }
        return ""
    }

    const validatePassword = () => {
        if (!password) {
            return "Require Password";
        }
        if (!passwordPattern.test(password)) {
            return "Minimum 8 characters, example Abc12345";
        }
        return "";
    }

    const validateEmail = () => {
        if (!email) {
            return "Require Email";
        }else if (!emailPattern.test(email)) {
            return "Email is invalidate";
        }
        return ""
    }

    const handleUpdateAdmins = async (e) => {
        e.preventDefault()

        let ErrorName = valdateName()
        setNameError(ErrorName)
        let ErrorPassword = validatePassword()
        setPasswordError(ErrorPassword)
        let ErrorLastName = validateLastName()
        setLastNameError(ErrorLastName)
        let ErrorEmail = validateEmail()
        setEmailError(ErrorEmail)

        const data = {
            name,
            lastName,
            email,
            password
        }

        if (ErrorName || ErrorPassword || ErrorLastName || ErrorEmail ) {
            return;
        }else{
            //await dispatch(Login(data))
            Swal.fire({
                title: 'Estas seguro?',
                text: "Los datos actualizados se quedaran guardados en el sistema",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed) {
                  Swal.fire(
                    'Administrador Actualizado',
                    'Los datos del admin han sido actualizados con exito',
                    'success'
                  )
                    // muestra los datos
                    //console.log(datos)
                    //dispatch(PostResponse(datos))
                    //loadResponse({datos, socket})
                    //console.log(data)
                    dispatch(UpdateUserAdmins(idUser, data))

                    //socket.emit("client:createAdmin", data)
                }
            })
            //navigate("/panelAdmin")
        }
    }

    useEffect(() => {
        if (errorSocketDos) {
            Swal.fire('Ups!', `${errorSocketDos}`, 'error').then(() => {
                setErrorSocket(null); // Limpiar el error después de mostrarlo
            });
        }
    }, [errorSocket])

    const openModal = (id) => {
        setIsModalOpen(true);
        setIdUser(id)
    };
    
      const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        //socket.emit("client:createAdmins")
        dispatch(GetUsersAdmins())

    }, [])

    useEffect(() => {
        if (isModalOpen) {
            socket.emit("cliente:getUserAdmins", idUser)
        }
    }, [isModalOpen])

    return(

        <div>

            {

                dataPagination.length > 0 ? (

                    <div className={style.container_admin}>

                        <div className={style.container_panel_admin}>

                            {
                                //<div className={style.container_excel}>
                                //    <button className={style.excel} onClick={generateExcel}>
                                //        <img src={excel} alt="excel" width="25px" height="25px" />
                                //    </button>
                                //</div>
                            }

                            <table className={style.container_panel_table}>
                                <thead className={style.container_options_columns}>
                                    <tr className={style.container_options} >
                                      <th scope="col">ID</th>
                                      <th scope="col">NAME</th>
                                      <th scope="col">LASTNAME</th>
                                      <th scope="col">EMAIL</th>
                                      <th scope="col">ADMIN</th>
                                      <th scope="col">PASSWORD</th>
                                      <th scope="col">DELETE</th>
                                      <th scope="col">UPDATE</th>
                                    </tr>
                                </thead>

                                <tbody className={style.container_general}>
                                    {
                                        dataPagination.map((result, index) => {
                                            return(

                                                <tr className={style.container_info} key={result.id}>
                                                    <td className={style.general}>{result.id}</td>
                                                    <td className={style.general}>{result.name}</td>
                                                    <td className={style.general}>{result.lastName}</td>
                                                    <td className={style.general}>{result.email}</td>
                                                    <td className={style.general}>{result.admin ? "Admin" : "No Admin"}</td>
                                                    <td className={style.general}>{result.password}</td>
                                                    <td className={style.general}>
                                                        <img style={{cursor : 'pointer'}} onClick={() => handleDeleteAdmins(result.id)} src={tacho} width="30px" height="30px" alt="Borrar Dato" />
                                                    </td>
                                                    <td className={style.general}>
                                                        <img style={{cursor : 'pointer'}} src={update} onClick={() => openModal(result.id)} width="30px" height="30px" alt="update data" />
                                                    </td>
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

            {isModalOpen && (
                <div className={`${style.modal} ${isModalOpen ? style.show : ''}`}>
                    <div className={style.modal_content}>
                        <span className={style.close} onClick={closeModal}>
                            <img src={cerrar} width="40px" height="40px" alt="cerrar ventana" />
                        </span>
                        {/* Agrega aquí tu formulario o contenido del modal */}
                        <div className={style.container_center}>
                                <div className={style.container_form} >
                                    <div className={style.container_title} >
                                        <p className={style.parrafo_title}>
                                            UPDATE ADMIN
                                        </p>
                                    </div>
                                    <form className={style.form} onSubmit={(e) => handleUpdateAdmins(e)}>
                                        <div className={style.container_name}>
                                            <label className={style.name}  >Name:</label>
                                            <input className={ nameError ? style.input_name_error : style.input_name} type="text" placeholder={nameError ? nameError : datoSocket?.name} onChange={(e) => handleName(e)} value={name} />
                                        </div>
                                        <div className={style.container_name}>
                                            <label className={style.name}  >LastName:</label>
                                            <input className={ lastNameError ? style.input_name_error : style.input_name} type="text" placeholder={lastNameError ? lastNameError : datoSocket?.lastName} onChange={(e) => handleLastName(e)} value={lastName} />
                                        </div>
                                        <div className={style.container_name}>
                                            <label className={style.name}  >Email:</label>
                                            <input className={ emailError ? style.input_name_error : style.input_name} type="text" placeholder={emailError ? emailError : datoSocket?.email} onChange={(e) => handleEmail(e)} value={email} />
                                        </div>
                                        <div className={style.container_password}>
                                            <label className={style.password} >Password:</label>
                                            <input className={ passwordError ? style.input_password_error : style.input_password} type="password" placeholder={passwordError ? passwordError : datoSocket?.password} onChange={(e) => handlePassword(e)} value={password} />
                                        </div>
                                        <div className={style.container_button}>
                                            <button className={style.button}>
                                                UPDATE
                                            </button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default Admins