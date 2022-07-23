import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import userPhoto from "../../assets/img/user.png";
import s from './profile.module.css'
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from "@mui/material/IconButton";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {initTC, loginTC, ProfileType} from "./profile-reducer";
import {Action} from "redux";
import {LoginParamsType} from "./profile-api";
import Typography from "@mui/material/Typography";

export const Profile = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profile)

    const registerData = {
        email: "khiliukbrest@gmail.com",
        password: "12345678",
        rememberMe: false
    }
   /* useEffect(() => {
        dispatch(initTC())
    },[])*/
    useEffect(() => {
        dispatch(loginTC(registerData))
    }, [])

    return (
        <Box>
            <Paper elevation={3} className={s.profile}>
                <Typography variant={'h3'}>Profile</Typography>
                <div><img src={profile.avatar} alt="user" className={s.photo}/></div>
                <div className={s.iconPhoto}>
                    <IconButton aria-label="add" color={'primary'}>
                        <AddAPhotoIcon />
                    </IconButton>
                </div>
                <div>
                    <Typography variant={'h5'} className={s.name}>{profile.name}</Typography>
                    <IconButton aria-label="create" color={'primary'}>
                        <CreateIcon />
                    </IconButton>
                </div>
                <Typography variant={'h6'} className={s.email}>{profile.email}</Typography>
                <Button variant="contained"  startIcon={<LogoutIcon />}>
                    Log out
                </Button>

            </Paper>     
        </Box>
    );
};

