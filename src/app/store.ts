import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {signUpReducer} from "../features/singUp/signUp-reducer";
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../features/singIn/login-reducer";
import thunk from "redux-thunk";
// import {passwordRecoverReducer} from "../features/recoveryPassword/recoveryPassword-reducer";
import {resetPasswordReducer} from "../features/newPassword/newPassword-reducer";
import {passwordRecoverReducer} from "../features/recoveryPassword/recoveryPassword-reducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    registration:signUpReducer,
    auth: loginReducer,
    recoveryPass:passwordRecoverReducer,
    newPass:resetPasswordReducer,
})

//Для DEVTools  Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//





// export const store = createStore(rootReducer)

export const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;