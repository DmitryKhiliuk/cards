import {authAPI, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {profileAPI} from "../profile/profile-api";
import {setProfileAC} from "../profile/profile-reducer";
import {setAppStatusAC} from "../../app/app-reducer";

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




export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {

        })
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>