import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import style from "../CardsPack.module.css";
import {PacksSearch} from "../packsSearch/packsSearch";
import {CARDS, CARDSFORPACKS} from "../../../common/routes/routes";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {CardPacksType} from "../api-CardsPack";
import {CardsType} from "./api-Cards";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {addCardTC} from "./cards-reducer";

export const HeaderCard = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)
    const cards=useSelector<AppRootStateType, CardsType[]>(state => state.cards.cardsTableData.cards)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const packUserId=useSelector<AppRootStateType, string>(state => state.cards.cardsTableData.packUserId)
    const id = cards.map(el => el.cardsPack_id)

    const card = packs.find((el) => el._id === id[0])

    const addCardHandler = () => {
        // @ts-ignore
        dispatch(addCardTC({cardsPack_id: id[0]}))
    }

    return (
        <div >
            <a href={CARDS} style={{textDecoration: 'none'}}><Button variant="contained" size={"small"}
                                                                      startIcon={<KeyboardBackspaceIcon/>}>
                BACK
            </Button></a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{card && card.name}</h2>
                {(myId === packUserId) && <Button variant="contained" onClick={addCardHandler}>Add new card</Button>}
            </div>
            <div className={style.searchCardsPack}>
                <h3>Search</h3>
                <PacksSearch/>
            </div>

        </div>
    );
};

