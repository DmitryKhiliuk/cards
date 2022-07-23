import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import thunkMiddleware from 'redux-thunk'

export const rootReducer = combineReducers({
    profile: profileReducer,
    auth: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;