import React from 'react';
import {loginTC, ProfileType} from "../profile/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {Navigate} from "react-router-dom";

export const SingIn = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const registerData = {
        email: "khiliukbrest@gmail.com",
        password: "12345678",
        rememberMe: false
    }

    const onClickHandler = () => {
        dispatch(loginTC(registerData))
    }

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div onClick={onClickHandler}>
            SING IN
        </div>
    );
};

