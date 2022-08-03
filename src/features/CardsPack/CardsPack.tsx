import React, {useEffect, useState} from 'react';
import {TableList} from "./PacksList/Table/tableList";
import Paper from "@mui/material/Paper";
import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./PacksList/header/HeaderCardsPack";
import {PaginationCardsPack} from "./PacksList/footer/PaginationCardsPack";
import {getPacksTC} from "./cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {CardPacksType, PacksQueryParamsType} from "./api-CardsPack";

export const CardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const min = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.min)
    const max = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.max)
    const [packNameSearch,setPackNameSearch]=useState('')

    useEffect(() => {
        dispatch(getPacksTC({packName:packNameSearch}))
    }, [min, max])

    return (
            <div className={style.blockTable}>
                <HeaderCardsPack/>
                <TableList/>
                <PaginationCardsPack/>
            </div>
    );
}

