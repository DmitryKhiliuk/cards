import React, {useEffect} from 'react';
import DataGridDemo from "../../common/Table/Table";
import s from "./CardsPack.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {getCardsTC, PackType} from "./cardsPack-reducer";
import DataGridProDemo from "../../common/Table/Table";
import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../../common/Table/Table";

export const CardsPack = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()


    useEffect(() => {
        dispatch(getCardsTC())
    }, [])

    return (
        <div >

                <DataGridDemo/>

        </div>
    );
};

