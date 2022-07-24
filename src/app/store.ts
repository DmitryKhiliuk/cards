import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/singIn/auth-reducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    profile: profileReducer,
    auth: appReducer,
    isLoggedIn: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;