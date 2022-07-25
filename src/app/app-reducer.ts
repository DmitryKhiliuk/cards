import {Dispatch} from "redux";
import {profileAPI} from "../features/profile/profile-api";
import {authAPI} from "../api/cards-api";

const initialStateApp = {
    status: 'idle',
    isInitialized: false,
    error: null
}

export const appReducer = (state: InitialStateAppType = initialStateApp, action: setIsLoggedInACType) => {
    switch (action.type){
        // case 'APP/SET-STATUS':
        //     return {...state, status: action.status}
        // case 'APP/SET-ERROR':
        //     return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initTC = () => {
    return (dispatch:Dispatch) => {
        authAPI.me()
            .then((res) => {
                dispatch(setInitializedAC(true))
            })
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateAppType = typeof initialStateApp
export type setIsLoggedInACType = ReturnType<typeof setInitializedAC>