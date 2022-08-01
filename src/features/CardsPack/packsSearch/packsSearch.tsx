import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {getPacksTC, getStartPacksTC} from "../cardsPack-reducer";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {PacksQueryParamsType} from "../api-CardsPack";
import {Table} from "@mui/material";


export const PacksSearch = () => {
    const [packNameSearch,setPackNameSearch]=useState('')

    // const packsQueryParams:PacksQueryParamsType = {
    //     packName : 'a',
    //     // pageCount: 5,
    //     // min: 1,
    //     // max : 1,
    //     // page : 5,
    //     // user_id : '',
    //     // sortPacks : '',
    // }
        const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const handlerGetPacks = () => {
       dispatch(getPacksTC({packName:packNameSearch}))
       // dispatch(getStartPacksTC())
    }
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >



            <InputBase

                sx={{ml: 1, flex: 1}}
                placeholder="Provide your text"
                inputProps={{'aria-label': 'Provide your text',
                    value:packNameSearch,
                onChange:(event => setPackNameSearch(event.currentTarget.value))

            }}

            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search"
                        onClick={handlerGetPacks}
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}