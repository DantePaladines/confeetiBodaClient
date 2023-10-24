import axios from "axios";

export const POST_RESPONSE = "POST_RESPONSE"
export const ERROR = "ERROR"
export const GET_USERS_ADMINS = "GET_USERS_ADMINS"
export const LOGIN_USER = "LOGIN_USER"
export const GET_LOGOUT = "GET_LOGOUT"
export const REFRESH = "REFRESH"
export const ERROR_GET_USER = "ERROR_GET_USER"
export const LOGIN_BOSS_ADMIN = "LOGIN_BOSS_ADMIN"
export const REFRESH_BOSS_ADMIN = "REFRESH_BOSS_ADMIN"
export const GET_LOGOUT_BOSS_ADMIN = "GET_LOGOUT_BOSS_ADMIN"
export const DELETE_USER_ADMIN = "DELETE_USER_ADMIN"
export const UPDATE_USER_ADMINS = "UPDATE_USER_ADMINS"

const deploy = 'https://confeetibodaserver.onrender.com'
const local = 'http://localhost:3001'


export const PostResponse = (datos) => {

    return async (dispatch) => {
        try {

            //socket.emit('respuesta', (datos) => {
            //    console.log(datos)
            //})
            
            const res = await axios.post(`${deploy}/response`, datos)
            dispatch({
                type : POST_RESPONSE,
                payload : res.data
            })

        } catch (error) {
            console.log(error)

            return dispatch({
                type : ERROR,
                payload : error.response.data
            })
        }
    }
}

export const Login = (data) => {
    return async (dispatch) => {
        try {
            const userLogin = await axios.post(`${deploy}/login`, data, {
                withCredentials : true
            })
            localStorage.setItem("user", JSON.stringify(userLogin.data))
            return dispatch({
                type : LOGIN_USER,
                payload : userLogin.data
            })

            //axios.defaults.headers.common["Authorization"] = `Bearer ${userLogin.data['token']}` para obtener el token

        } catch (error) {
            console.log(error.response.data)
            return dispatch({
                type : ERROR,
                payload : error.response.data
            })
        }
    }
}

export const GetUsersAdmins = () => {
    return async (dispatch) => {
        try {
            const Users = await axios.get(`${deploy}/getUser/getUsersAdmins`)
            return dispatch({
                type : GET_USERS_ADMINS,
                payload : Users.data
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type : ERROR_GET_USER,
                payload : error.response.data
            })
        }
    }
}

export const Logout = () => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`${deploy}/getUser/logout`, {
                withCredentials : true
            })
            console.log(res.data)
            return dispatch({
                type : GET_LOGOUT,
                payload : res.data
            })
            
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const RefreshToken = () => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`${deploy}/refreshToken`, {
                withCredentials : true
            })
            //console.log(res.data)
            return dispatch({
                type : REFRESH,
                payload : res.data
            })
            
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const GenerateExcel = () => {
    return async () => {
        try {

            const excel = await axios.get(`${deploy}/getUser/generateExcel`, {
                responseType : "blob"
            })

            // Crea un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([excel.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Invitados.xlsx'); // Establece el nombre del archivo

            // Simula un clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Libera la URL creada para el objeto blob
            window.URL.revokeObjectURL(url);

            //console.log(excel.data)
            
        } catch (error) {
            console.log(error.response.data)
        }
    }
}


export const LoginBossAdmin = (datos) => {
    return async (dispatch) => {
        try {

            const bossAdmin = await axios.post(`${deploy}/loginBossAdmin`, datos, {
                withCredentials : true
            })
            //console.log(bossAdmin.data)
            localStorage.setItem("userBossAdmin", JSON.stringify(bossAdmin.data))
            
            return dispatch({
                type : LOGIN_BOSS_ADMIN,
                payload : bossAdmin.data
            })

        } catch (error) {
            console.log(error.response.data)
            return dispatch({
                type : ERROR,
                payload : error.response.data
            })
        }
    }
}

export const RefreshTokenBossAdmin = () => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`${deploy}/refreshTokenBossAdmin`, {
                withCredentials : true
            })

            console.log(res.data)

            return dispatch({
                type : REFRESH_BOSS_ADMIN,
                payload : res.data
            })
            
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const LogoutBossAdmin = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${deploy}/getUser/logoutBossAdmin`, {
                withCredentials : true
            })
            console.log(res.data)
            return dispatch({
                type : GET_LOGOUT_BOSS_ADMIN,
                payload : res.data
            })

        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const DeleteUserAdmin = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${deploy}/getUser/deleteUserAdmin/${id}`)
            //console.log(id)
            return dispatch({
                type : DELETE_USER_ADMIN,
                payload : id
            })
            
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const UpdateUserAdmins = (id, datos) => {
    return async (dispatch) => {
        try {

            const res = await axios.put(`${deploy}/updateUserAdmin/${id}`, datos)

            console.log(res.data)
            if (res && res.data) {
                return dispatch({
                    type: UPDATE_USER_ADMINS,
                    payload: res.data
                });
            } else {
                console.error("La respuesta del servidor está vacía o no contiene la propiedad 'data'.");
            }
        } catch (error) {
            //console.log(error.response.data)
            console.error("Error al realizar la solicitud PUT:", error);
        }
    }
}

//export function DeleteUserAdmin(id) {
//    return (dispatch) => {
//        return fetch(`http://localhost:3001/getUser/deleteUserAdmin/${id}`,{method : 'DELETE'})// hago una peticion de tipo delete
//        .then(data => {
//            console.log(id)
//            dispatch({
//                type : DELETE_USER_ADMIN,
//                payload : id,// el id del parametro lo coloco como valor del payload
//            })
//            
//        })
//    }
//}


//export const GenerateExcelDrive = () => {
//    return async () => {
//        try {
//
//        // URL de descarga del archivo de Excel en Google Drive
//        const googleDriveUrl = "https://docs.google.com/spreadsheets/d/1BQmewyGZsalYLzBDHcE59lHeQwlu0H48N3YRBLmJcHY/edit?usp=sharing";
//
//        // Realiza una solicitud GET a la URL de Google Drive
//        const response = await axios.get(googleDriveUrl, {
//          responseType: 'blob', // Indica que esperamos una respuesta binaria (archivo)
//        });
//
//        // Crea una URL temporal para el archivo descargado
//        const url = window.URL.createObjectURL(new Blob([response.data]));
//
//        // Crea un enlace temporal
//        const link = document.createElement('a');
//
//        // Configura el atributo href con la URL del archivo descargado
//        link.href = url;
//
//        // Establece el nombre del archivo para la descarga
//        link.setAttribute('download', 'InvitadosConfeeti.xlsx');
//
//        // Agrega el enlace al cuerpo del documento
//        document.body.appendChild(link);
//
//        // Simula un clic en el enlace para iniciar la descarga
//        link.click();
//
//        // Libera la URL creada para el objeto blob
//        window.URL.revokeObjectURL(url);
//            
//        } catch (error) {
//            console.log(error.response.data)
//        }
//    }
//}

export const setError = (error) => {
    return {
      type: ERROR,
      payload: error,
    };
};