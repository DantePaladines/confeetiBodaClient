import { 
    POST_RESPONSE, 
    ERROR, 
    GET_USERS_ADMINS, 
    LOGIN_USER, 
    GET_LOGOUT, 
    REFRESH, 
    ERROR_GET_USER,
    LOGIN_BOSS_ADMIN,
    REFRESH_BOSS_ADMIN,
    GET_LOGOUT_BOSS_ADMIN,
    DELETE_USER_ADMIN,
    UPDATE_USER_ADMINS
} from "./action.js";

const initalState = {
    response : [],
    user : [],
    userAdmin : [],
    refresh : [],
    userBossAdmin : [],
    refreshBossAdmin : [],
    error : null,
    errorGetUsers : null,
    userAdminsPanel : []
    
}

const RootReducer = (state = initalState, action) =>{
    switch (action.type) {
        case POST_RESPONSE:
            return {
                ...state,
                response : action.payload
            }
        case GET_USERS_ADMINS:
            return{
                ...state,
                userAdminsPanel : action.payload
            }
        case LOGIN_USER:
            return{
                ...state,
                userAdmin : action.payload
            }
        case LOGIN_BOSS_ADMIN:
            return{
                ...state,
                userBossAdmin : action.payload
            }

        case GET_LOGOUT:
            return{
                ...state,
                userAdmin : null,
                user : null
            }
        case GET_LOGOUT_BOSS_ADMIN:
            return{
                ...state,
                userBossAdmin : null,
                user : null,
                userAdminsPanel : null
            }
        case REFRESH:
            return{
                ...state,
                refresh : action.payload
            }
        case REFRESH_BOSS_ADMIN:
            return{
                ...state,
                refreshBossAdmin : action.payload
            }
        case ERROR : 
            return {
                error : action.payload
            }
        case ERROR_GET_USER:
            return{
                errorGetUsers : action.payload

            }
        case DELETE_USER_ADMIN:

            const dataEliminado = state.userAdminsPanel.filter(a => a.id !== action.payload )
            console.log(dataEliminado)
            return {
                ...state,
                userAdminsPanel : dataEliminado
            }
        case UPDATE_USER_ADMINS:

            const updatedUserIndex = state.userAdminsPanel.findIndex(user => user.id === action.payload.id);

            if (updatedUserIndex !== -1) {
                // Actualiza el usuario existente en lugar de agregar uno nuevo
                const updatedUser = {
                    ...state.userAdminsPanel[updatedUserIndex],
                    ...action.payload
                };
                
                const updatedPanel = [...state.userAdminsPanel];
                updatedPanel[updatedUserIndex] = updatedUser;
        
                return {
                    ...state,
                    userAdminsPanel: updatedPanel
                };
            } else {
                console.error("No se pudo encontrar el usuario actualizado en el estado existente.");
                return state;
            }
        default:
            return {
                state
            }
    }
}

export default RootReducer