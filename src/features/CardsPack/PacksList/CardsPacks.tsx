import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {CardsPacksType, fetchCardsPacksTC} from "./cardsPacks-reducer";
import {Pack} from "./Pack";
import s from "../../../app/App.module.css";

export const CardsPack = () => {

    const cardsPacks = useSelector<AppRootStateType, CardsPacksType[]>(state => state.cardsPacks.cardPacks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    useEffect(() => {
        dispatch(fetchCardsPacksTC())
    }, [])

    return <div className={s.block}>
        {cardsPacks.map(cd => {
        return <Pack key={cd._id} cardsPackName={cd.name}/>
    })}
    </div>

};