import {authAPI, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {profileAPI} from "../profile/profile-api";
import {setProfileAC} from "../profile/profile-reducer";

const initialState = {
    isLoggedIn: false
};

type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

    }
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(data)
        .then((res) => {
            dispatch(setProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))

        })
        .catch(() => {

        })
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>