import {Action, Dispatch} from "redux";
import {loginApi} from "../features/singIn/login-api";
import {setIsLoggedInAC} from "../features/singIn/login-reducer";
import {setProfileAC} from "../features/profile/profile-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: SetAppStatusActionType | setAppInitializedACType | SetAppErrorActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const initTC = () => {
    return (dispatch:Dispatch) => {
        loginApi.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
                //Ошибки из ответа
                handleServerAppError(errorResponse, dispatch)
                //Серверные ошибки
                handleServerNetworkError(error, dispatch)
            })
            .finally(() => {
                // dispatch(isFetchingAC(false))
            })
    }
}

// export const initTC = () => {
//     return (dispatch: Dispatch) => {
//         loginApi.me()
//             .then((res) => {
//                 dispatch(setProfileAC(res.data))
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppInitializedAC(true))
//             })
//     }
// }
