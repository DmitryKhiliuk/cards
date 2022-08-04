import React, {useEffect} from 'react';
import {CardsList} from "./CardsList";
import {HeaderCard} from "./HeaderCard";
import {PaginationCards} from "./PaginationCards";
import {getPacksTC} from "../cardsPack-reducer";
import {setCardsTC} from "./cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {CardsType} from "./api-Cards";

export const Cards = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const cards=useSelector<AppRootStateType, CardsType[]>(state => state.cards.cardsTableData.cards)
    const id = cards.map(el => el.cardsPack_id)
    useEffect(() => {
        console.log(cards)
        dispatch(setCardsTC(id[0]))
    }, [])
    return (
        <div style={{backgroundColor: 'white', padding: '10px'}}>
            <HeaderCard/>
            <CardsList/>
            <PaginationCards/>
        </div>
    );
};

