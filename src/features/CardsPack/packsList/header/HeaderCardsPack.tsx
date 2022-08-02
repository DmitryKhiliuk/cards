import React from 'react'
import {PacksSearch} from "../../packsSearch/packsSearch";
import Button from "@mui/material/Button";
import {addCardsPackTC, getPacksTC} from "../../cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {Action} from "redux";
import style from '../../CardsPack.module.css'

export const HeaderCardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const addPack = (name: string) => {
        dispatch(addCardsPackTC({name: name}) as any)
    }

    const onClickMyButton = () => {
        dispatch(getPacksTC({user_id: userId}))
    }
    const onClickAllButton = () => {
        dispatch(getPacksTC({user_id: ""}))
    }

    return <div className={style.headerCardsPack}>
        <h2 className={style.titleHeaderCP}>Packs list</h2>
        <div className={style.blockBtnAddCP}>
            <Button onClick={event => addPack('MaxTs')} variant="contained" size={"small"} className={style.btnAddCP}
            >Add new pack</Button>
        </div>
        <div className={style.searchCardsPack}>
            <h3>Search</h3>
            <PacksSearch/>
        </div>
        <div className={style.changeCardsPack}>
            <Button onClick={onClickMyButton} variant="contained" className={style.btnCardsPack}>My
                Packs</Button>
            <Button onClick={onClickAllButton} variant="contained" className={style.btnCardsPack}>All
                Packs</Button>
        </div>
        <div className={style.sliderCardsPack}></div>
    </div>
}