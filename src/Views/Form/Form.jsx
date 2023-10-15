import React from "react";
import style from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostResponse, setError } from "../../Redux/action";
import Swal from "sweetalert2";
//import { loadResponse } from "../../Redux/action";
import acceptHeard from "../../images/heartUno.png";
import rejectHeard from "../../images/heartDos.png";

const Form = ({socket}) => {

  // Define el manejador de eventos una sola vez cuando se monta el componente.
  //useEffect(() => {
  //  const handleRes = (rpta) => {
  //    console.log(rpta);
  //  };
//
  //  socket.on("res", handleRes);
//
  //  // Limpia el manejador de eventos cuando el componente se desmonta.
  //  return () => {
  //    socket.off("res", handleRes);
  //  };
  //}, [socket]);

    const dispatch = useDispatch()

    const error = useSelector((state) => state.error)

    const [accept, setAccept] = useState(null)
    const [guests, setGuests] = useState(0)
    const [nameGuests, setNameGuests] = useState("")
    const [allergies, setAllergies ] = useState("")
    const [meat, setMeat] = useState(0)
    const [chicken, setChicken] = useState(0)
    const [fish, setFish] = useState(0)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    //Estados de Errores

    const [ erroGuests, setErrorGuests ] = useState("")
    const [ allergiesError, setAllergiesError ] = useState("")
    const [ nameError, setNameError ] = useState("")
    const [ phoneError, setPhoneError ] = useState("")
    const [ emailError, setEmailError ] = useState("")

    // Funciones de captura de datos

    const handleAccept = (e) => {

        const value = parseInt(e.target.value)

        if (value === 1) {
            setAccept(true)
        }
        if(value === 0) {
            setAccept(false)
        }
    }

    const handleGuests = (e) => {
        setGuests(parseInt(e.target.value))
    }

    const handleNameGuests = (e) => {
        setNameGuests(e.target.value)
    }

    const handleAllergies = (e) => {
        setAllergies(e.target.value)
    }

    const handleMeat = (e) => {
        setMeat(parseInt(e.target.value))
    }

    const handleChicken = (e) => {
        setChicken(parseInt(e.target.value))
    }

    const handleFish = (e) => {
        setFish(parseInt(e.target.value))
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // capturando errores

    const namePattern = RegExp(/^[a-zA-Z ,]+$/)
    const phonePattern = RegExp(/^\+?[0-9()-.\s]+$/)
    const emailPattern = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    const validateAccept = () => {
        if (accept === null) {
            return "Elige una opcion";
        }
        return "";
    }

    const validateNameGuests = () => {
        if (!nameGuests) {
            return "";
        }else if (!namePattern.test(nameGuests)) {
            return "El Nombre es Invalido";
        }
        return "";
    }

    const validateAllergiesError = () => {
        if (!allergies) {
            return "";
        }else if (!namePattern.test(allergies)) {
            return "Dato Invalido";
        }
        return "";
    }

    const validateNameError = () => {
        if (!name) {
            return "El nombre es requerido";
        }else if (!namePattern.test(name)) {
            return "Nombre invalido";
        }
        return "";
    }

    const validatePhoneError = () => {
        if (!phone) {
            return "El numero es requerido";
        }else if (!phonePattern.test(phone)) {
            return "Numero invalido";
        }
        return "";
    }

    const validateEmailError = () => {
        if (!email) {
            return "El email es requerido";
        }else if (!emailPattern.test(email)) {
            return "Email invalido"
        }
        return "";
    }

    // enviar datos al server

    const handleSubmit = (e) => {
        try {
            e.preventDefault()

            //let errorAccept = validateAccept()
            //setAcceptError(errorAccept)
            let errorNameGuests = validateNameGuests()
            setErrorGuests(errorNameGuests)
            let errorAllergies = validateAllergiesError()
            setAllergiesError(errorAllergies)
            let errorName = validateNameError()
            setNameError(errorName)
            let errorPhone = validatePhoneError()
            setPhoneError(errorPhone)
            let errorEmail = validateEmailError()
            setEmailError(errorEmail)

            // convertimos numeros string a enteros
            //const numberGuests = parseInt(guests)
            //const meatDishes = parseInt(meat)
            //const chickenDishes = parseInt(chicken)
            //const fishDishes = parseInt(fish)

            const datos = {
                accept,
                numberGuests : guests,
                nameGuests,
                allergies,
                meatDishes : meat,
                chickenDishes : chicken,
                fishDishes : fish,
                name,
                phone,
                email
            }

            if ( errorNameGuests || errorName || errorPhone || errorEmail) {
                return;
            }else if (datos) {

                // Emitir un evento al servidor de Socket.io para notificar que se han registrado nuevos datos
                //const socket = io("http://localhost:3001");
                //io.emit("nuevo_registro", datos);

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
                        'Confirmacion Enviada',
                        'Los datos del usuario han sido registrados con exito',
                        'success'
                      )
                        // muestra los datos
                        //console.log(datos)
                        //dispatch(PostResponse(datos))
                        //loadResponse({datos, socket})

                        socket.emit("rptas", datos)

                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Ups!', `${error}`, 'error').then(() => {
              dispatch(setError(null)); // Limpiar el error después de mostrarlo
            });
        }
    }, [error, dispatch])


    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
      if (isFinished) {
        document.getElementById("decline").disabled = true;
        document.getElementById("accept").disabled = true;
      }
    }, [isFinished]);

    return(
        <div className={style.container_register}>
            <form className={style.container_form} onSubmit={(e) => handleSubmit(e)}>

                <div className={style.container_radio}>
                    <div className={style.container_accept}>
                        <input id="accept" className={ style.response_input} name="acceptance" type="radio" value={1} onChange={(e) => handleAccept(e)}/>
                        <label htmlFor="accept" className={style.box_icon} >
                            <span className={style.parrafo}>JOYFULLY ACCEPT</span>
                        </label>
                    </div>

                    <div className={style.container_decline}>
                        <input id="decline" className={ style.response_input} name="acceptance" type="radio" value={0} onChange={(e) => handleAccept(e)}/>
                        <label htmlFor="decline" className={style.box_icon}>
                            <span className={style.parrafo}>REGRETFULLY DECLINE</span>

                        </label>
                    </div>
                </div>

                <div className={style.div_number_guests}>
                    <label className={style.parrafo}>NUMBER OF GUESTS:</label>
                    <select className={style.input_select} id="" onChange={(e) => handleGuests(e)} value={guests}>
                        <option id="1" value={0}>0 (Not attending)</option>
                        <option id="2" value={1}>1</option>
                        <option id="3" value={2}>2</option>
                        <option id="4" value={3}>3</option>
                        <option id="5" value={4}>4</option>
                        <option id="6" value={5}>5</option>
                    </select>
                </div>

                <div className={style.div_name_guests}>
                    <label className={style.parrafo}>NAME(S) OF GUESTS:</label>
                    <h6 className={style.parrafo}>Kindly enter the names for the seating plan.</h6>
                    <input className={ erroGuests ? style.input_name_guests_error : style.input_name_guests} type="text" placeholder={ erroGuests ? erroGuests :  "NAME(S)"} value={nameGuests} onChange={(e) => handleNameGuests(e)} />
                </div>

                <div className={style.div_name_guests}>
                    <label className={style.parrafo}>DIETARY REQUIREMENTS:</label>
                    <input className={ allergiesError ? style.input_dietary_error : style.input_dietary} type="text" placeholder={ allergiesError ? allergiesError : "E.G. ALLERGIES"} value={allergies} onChange={(e) => handleAllergies(e)} />
                </div>

                <div className={style.container_platos_comida}>
                    <label className={style.parrafo}>DISHES:</label>
                    <div className={style.container_platillos}>
                        <label className={style.parrafo}>MEAT DISHES :</label>
                        <input className={style.input_meat} type="number" min={0} value={meat} onChange={(e) => handleMeat(e)} />
                    </div>

                    <div className={style.container_platillos}>
                        <label className={style.parrafo}>CHICKEN DISHES :</label>
                        <input className={style.input_chicken} type="number" min={0} value={chicken} onChange={(e) => handleChicken(e)} />
                    </div>

                    <div className={style.container_platillos}>
                        <label className={style.parrafo}>FISH DISHES :</label>
                        <input className={style.input_fish} type="number" min={0} value={fish} onChange={(e) => handleFish(e)} />
                    </div>

                </div>

                <div className={style.container_info}>
                    <label className={style.parrafo}>CONTACT INFO:</label>
                    <div className={style.container_info_inputs}>
                        <input className={ nameError ? style.input_name_error : style.input_name} type="text" placeholder={ nameError ? nameError : "NAME"} value={name} onChange={(e) => handleName(e)} />
                        <input className={ phoneError ? style.input_phone_error : style.input_phone} type="text" placeholder={ phoneError ? phoneError : "PHONE"} value={phone} onChange={(e) => handlePhone(e)} />
                        <input className={ emailError ? style.input_email_error : style.input_email} type="text" placeholder={ emailError ? emailError : "EMAIL"} value={email} onChange={(e) => handleEmail(e)} />
                    </div>
                </div>

                <div className={style.container_button}>

                    <button className={style.btn}>
                        REPLY NOW
                    </button>

                </div>
                
            </form>
        </div>
    )
}

export default Form


//<div className={style.container_radio}>
//<div className={style.container_accept}>
//    <input className={ style.input_accept} name="acceptance" type="radio" value={1} onChange={(e) => handleAccept(e)}/>
//    <label className={style.parrafo}>JOYFULLY ACCEPT</label>
//</div>
//
//<div className={style.container_decline}>
//    <input className={ style.input_reject} name="acceptance" type="radio" value={0} onChange={(e) => handleAccept(e)}/>
//    <label className={style.parrafo}>REGRETFULLY DECLINE</label>
//</div>
//</div>