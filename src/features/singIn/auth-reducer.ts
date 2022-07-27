import {authAPI, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {profileAPI} from "../profile/profile-api";
import {setProfileAC} from "../profile/profile-reducer";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const);



export const initTC = () => {
    return (dispatch:Dispatch) => {
        authAPI.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
            })
            .catch((error) => {
                const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
                //Ошибки из ответа
                handleServerAppError(errorResponse, dispatch)
                //Серверные ошибки
                // handleServerNetworkError(error, dispatch)
            })
            .finally(() => {
                // dispatch(isFetchingAC(false))
            })
    }
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(data)
        .then((res) => {
            dispatch(setProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))

        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)
            //Серверные ошибки
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            // dispatch(isFetchingAC(false))
        })
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>