import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {fetchCardsPacksTC} from "./cardsPacks-reducer";
import s from "../CardsPacks.module.css";
import {DataGridDemo} from "./table/Table";

export const CardsPack = () => {
    console.log('cardsPack')

    // const cardsPacks = useSelector<AppRootStateType, CardsPacksType[]>(state => state.cardsPacks.cardPacks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    useEffect(() => {
        dispatch(fetchCardsPacksTC())
    }, [])

    return <div className={s.blockCardsPacks}>
        <DataGridDemo/>
        {/*{cardsPacks.map(cd => {*/}
        {/*return <Pack key={cd._id} cardsPackName={cd.name}/>*/}
    </div>

};