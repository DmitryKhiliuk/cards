import {Dispatch} from "redux";
import {signUpApi} from "./api-signUp";
import {AppDispatch} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isReg: false,
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_USER": {
            return {
                ...state, isReg: true
            }
        }
        default:
            return state
    }
}

export const setNewUserAC = () => ({type: 'SET_NEW_USER'} as const);

export const setNewUserTC = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    // dispatch(isFetchingAC(true))
    signUpApi.registration(email, password)
        .then(response => {
            // console.log(response.data)
            dispatch(setNewUserAC())
            dispatch(setAppStatusAC('succeeded'))
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
export type SetNewUserType = ReturnType<typeof setNewUserAC>;

type ActionType = SetNewUserType
