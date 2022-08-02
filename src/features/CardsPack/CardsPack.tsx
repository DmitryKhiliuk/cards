import React, {useEffect, useState} from 'react';
import {TableList} from "./packsList/Table/tableList";
import Paper from "@mui/material/Paper";
import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./packsList/header/HeaderCardsPack";
import {PaginationCardsPack} from "./packsList/footer/PaginationCardsPack";
import {getPacksTC} from "./cardsPack-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";

export const CardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const [packNameSearch,setPackNameSearch]=useState('')

    useEffect(() => {
        dispatch(getPacksTC({packName:packNameSearch}))
    }, [])

    return (
            <div className={style.blockTable}>
                <HeaderCardsPack/>
                <TableList/>
                <PaginationCardsPack/>
            </div>
    );
}

