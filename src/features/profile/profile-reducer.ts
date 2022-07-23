import {Dispatch} from "redux";
import {LoginParamsType, profileAPI} from "./profile-api";


export type ProfileType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: false,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number,
    token: string,
    tokenDeathTime: number
    avatar: string
}


const initialState: any = ''

export const profileReducer = (state: ProfileType = initialState, action: setProfileACType):ProfileType => {
    switch (action.type){
        case 'PROFILE':
            return action.profile
    }
    return state
}
export type setProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile:ProfileType) => {
    return {
        type: 'PROFILE',
        profile
    } as const
}

export const initTC = () => {
    return (dispatch:Dispatch) => {
        profileAPI.me()
            .then((res) => {
                dispatch(setProfileAC(res.data))
            })
    }
}

export const loginTC = (data: LoginParamsType) => {
    return (dispatch:Dispatch) => {
        profileAPI.login(data)
            .then((res) => {
                dispatch(setProfileAC(res.data))
            })
    }
}