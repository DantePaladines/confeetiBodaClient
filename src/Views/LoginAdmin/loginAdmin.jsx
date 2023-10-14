import React, {useEffect, useState} from "react";
import style from "./loginAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Login, setError } from "../../Redux/action.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginAdmin = ({socket}) => {

    const dispatch = useDispatch()

    const dataAdmin = useSelector((state) => state.userAdmin)
    const error = useSelector((state) => state.error)

    //console.log(error)

    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")

    // capturar de errores

    const [ nameError, setNameError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")

    const navigate = useNavigate()

    //const admin = useSelector((state) => state.userAdmin)

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    // validando funciones

    const namePattern = RegExp(/^[a-zA-Z ,]+$/)
    const passwordPattern = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/);

    const valdateName = () => {
        if (!name) {
            return "Require Name";
        }else if (!namePattern.test(name)) {
            return "User is invalidate";
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

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        let ErrorName = valdateName()
        setNameError(ErrorName)
        let ErrorPassword = validatePassword()
        setPasswordError(ErrorPassword)

        const data = {
            name,
            password
        }

        if (ErrorName || ErrorPassword) {
            return;
        }else{
            await dispatch(Login(data))
            // falta una cosa mas como una funcion para manejar estas redirecciones
            //navigate("/panelAdmin")
        }
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Ups!', `${error}`, 'error').then(() => {
              dispatch(setError(null)); // Limpiar el error después de mostrarlo
              navigate("/loginAdmin")
              return;
            });
        }
    }, [error, dispatch])

    useEffect(() => {
        if (dataAdmin) {
          navigate("/panelAdmin");
        }
    }, [dataAdmin]);

    return(
        <div className={style.container_center}>
            <div className={style.container_form} >

                <div className={style.container_title} >
                    <p className={style.parrafo_title}>
                        LOGIN ADMIN
                    </p>
                </div>

                <form className={style.form} onSubmit={(e) => handleSubmitLogin(e)}>
                    <div className={style.container_name}>
                        <label className={style.name}  >Name:</label>
                        <input className={ nameError ? style.input_name_error : style.input_name} type="text" placeholder={nameError ? nameError : 'Name'} onChange={(e) => handleName(e)} value={name} />
                    </div>
                    <div className={style.container_password}>
                        <label className={style.password} >Password:</label>
                        <input className={ passwordError ? style.input_password_error : style.input_password} type="password" placeholder={passwordError ? passwordError : "Password"} onChange={(e) => handlePassword(e)} value={password} />
                    </div>
                    <div className={style.container_button}>
                        <button className={style.button}>
                            Sing In
                        </button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default LoginAdmin