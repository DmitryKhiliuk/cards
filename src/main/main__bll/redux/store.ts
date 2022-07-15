import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;