import React, {useEffect, useState} from "react";
import style from "./createAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Login, setError } from "../../../Redux/action.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateAdmin = ({socket}) => {

    const dispatch = useDispatch()

    const error = useSelector((state) => state.error)

    useEffect(() => {
        const handleRes = (rptas) => {

            setErrorSocket(rptas)
        };
    
        socket.on("createAdminError:server", handleRes);
    
        // Limpia el manejador de eventos cuando el componente se desmonta.
        return () => {
          socket.off("createAdminError:server", handleRes);
        };
    }, [socket]);

    const [ errorSocket, setErrorSocket ] = useState(null)

    //console.log(error)

    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")

    // capturar de errores

    const [ nameError, setNameError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ lastNameError, setLastNameError ] = useState("")
    const [ emailError, setEmailError ] = useState("")

    const navigate = useNavigate()

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

    const handleSubmitLogin = async (e) => {
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
                text: "Los datos quedaran guardados en el sistema",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed) {
                  Swal.fire(
                    'Administrador Creado',
                    'Los datos del usuario han sido registrados con exito',
                    'success'
                  )
                    // muestra los datos
                    //console.log(datos)
                    //dispatch(PostResponse(datos))
                    //loadResponse({datos, socket})

                    console.log(data)

                    socket.emit("client:createAdmin", data)
                }
            })
            //navigate("/panelAdmin")
        }
    }

    useEffect(() => {
        if (errorSocket) {
            Swal.fire('Ups!', `${errorSocket}`, 'error').then(() => {
                setErrorSocket(null); // Limpiar el error después de mostrarlo
            });
        }
    }, [errorSocket])

    return(
        <div className={style.container_center}>
            <div className={style.container_form} >

                <div className={style.container_title} >
                    <p className={style.parrafo_title}>
                        CREATE ADMIN
                    </p>
                </div>

                <form className={style.form} onSubmit={(e) => handleSubmitLogin(e)}>
                    <div className={style.container_name}>
                        <label className={style.name}  >Name:</label>
                        <input className={ nameError ? style.input_name_error : style.input_name} type="text" placeholder={nameError ? nameError : 'Name'} onChange={(e) => handleName(e)} value={name} />
                    </div>
                    <div className={style.container_name}>
                        <label className={style.name}  >LastName:</label>
                        <input className={ lastNameError ? style.input_name_error : style.input_name} type="text" placeholder={lastNameError ? lastNameError : 'LastName'} onChange={(e) => handleLastName(e)} value={lastName} />
                    </div>
                    <div className={style.container_name}>
                        <label className={style.name}  >Email:</label>
                        <input className={ emailError ? style.input_name_error : style.input_name} type="text" placeholder={emailError ? emailError : 'Email'} onChange={(e) => handleEmail(e)} value={email} />
                    </div>
                    <div className={style.container_password}>
                        <label className={style.password} >Password:</label>
                        <input className={ passwordError ? style.input_password_error : style.input_password} type="password" placeholder={passwordError ? passwordError : "Password"} onChange={(e) => handlePassword(e)} value={password} />
                    </div>
                    <div className={style.container_button}>
                        <button className={style.button}>
                            CREATE
                        </button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default CreateAdmin