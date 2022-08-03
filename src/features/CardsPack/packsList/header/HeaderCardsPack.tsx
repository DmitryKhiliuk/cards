import React, {useState} from 'react'
import React, {ChangeEvent, useState} from 'react'
import {PacksSearch} from "../../packsSearch/packsSearch";
import Button from "@mui/material/Button";
import {addCardsPackTC, getPacksTC, setOptionsAC} from "../../cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {Action} from "redux";
import style from '../../CardsPack.module.css';
import {Slider} from '@material-ui/core'

export const HeaderCardsPack = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const max = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.max)
    const min = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.min)
    const [value, setValue] = useState([min || 0, max || 100])

    const addPack = (name: string) => {
        dispatch(addCardsPackTC({name: name}) as any)
    }
    const [buttonPaks,setButtonPaks]=useState(false)

    const onClickMyButton = () => {
        setButtonPaks(false)
        dispatch(getPacksTC({user_id: userId}))
    }
    const onClickAllButton = () => {
        setButtonPaks(true)
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
            <Button onClick={event => addPack('MaxTs')} variant="contained"  className={style.btnAddCP}
            >Add new pack</Button>
        </div>
        <div className={style.searchCardsPack}>
            <h3>Search</h3>
            <PacksSearch/>
        </div>
        <div className={style.changeCardsPack}>
            <Button onClick={onClickMyButton} variant={buttonPaks? "contained":"outlined"} className={style.btnCardsPack}>My
                Packs</Button>
            <Button onClick={onClickAllButton} variant={!buttonPaks? "contained":"outlined"} className={style.btnCardsPack}>All
                Packs</Button>
        </div>
        <div className={style.sliderCardsPack}>
            <Slider
                value={value}
                onChange={onChangeCallback}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="on"
            />
        </div>
    </div>
}