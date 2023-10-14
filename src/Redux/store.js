import { compose, applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducer.js";


const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose

const store = legacy_createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store