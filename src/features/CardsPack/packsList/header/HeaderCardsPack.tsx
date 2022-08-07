import React, {ChangeEvent, useState} from 'react'
import {PacksSearch} from "../../packsSearch/packsSearch";
import Button from "@mui/material/Button";
import {addCardsPackTC, getPacksTC, setOptionsAC} from "../../cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {Action} from "redux";
import style from '../../CardsPack.module.css'
import {Slider} from "@material-ui/core";
import {NewPackModal} from "../Table/NewPackModal";


export const HeaderCardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const max = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.max)
    const min = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.min)

    const [value, setValue] = useState([min || 0, max || 100])
    const [buttonPaks, setButtonPaks] = useState(true)

    const addPack = (name: string) => {
        dispatch(addCardsPackTC({name: name}) as any)
    }

    const onClickMyButton = () => {
        setButtonPaks(buttonPaks=>!buttonPaks)
        dispatch(getPacksTC({user_id: userId}))
    }
    const onClickAllButton = () => {
        setButtonPaks(buttonPaks=>!buttonPaks)
        dispatch(getPacksTC({user_id: ""}))
    }

    const onChangeCallback = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue(newValue)
        }
    }
    const handleChangeCommitted = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        Array.isArray(newValue) && dispatch(setOptionsAC({
            min: newValue[0],
            max: newValue[1]
        }))
    }
    return <div className={style.headerCardsPack}>
        <h2 className={style.titleHeaderCP}>Packs list</h2>
        <div className={style.blockBtnAddCP}>
            <Button variant="contained" className={style.btnAddCP}>
                <NewPackModal addPack={addPack}/>
            </Button>
        </div>
        <div className={style.searchCardsPack}>
            <h4>Search</h4>
            <PacksSearch/>
        </div>
        <div className={style.changeCardsPack}>
            <h4>Show packs cards</h4>
            <div>
                <Button onClick={onClickMyButton} variant="contained" className={style.btnCardsPack}
                        disabled={!buttonPaks}>My Packs</Button>
                <Button onClick={onClickAllButton} variant="contained" className={style.btnCardsPack}
                        disabled={buttonPaks}>All Packs</Button>
            </div>
        </div>
        <div className={style.sliderCardsPack}>
            <h4 className={style.titleSliderCardsPack}>Number of cards</h4>
            <Slider
                value={value}
                onChange={onChangeCallback}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="on"
            />
        </div>
    </div>
}