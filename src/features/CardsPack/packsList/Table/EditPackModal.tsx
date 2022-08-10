import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type EditPackModalType = {
    setOpen: (value: boolean) => void
    open: boolean
    editPackCards: (id:string,  name: string, privatePack: boolean) => void
    id: string

}

export const EditPackModal = (props:EditPackModalType) =>  {

    const [title, setTitle] = useState('')
    const [checked, setChecked] = useState(false)

    const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }

    const onChangeTextFieldHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editPackHandler = () => {
        props.editPackCards(props.id, title, checked)
        setChecked(false)
        props.setOpen(false)
    }

    return (
        <BasicModal name={''} open={props.open} setOpen={props.setOpen} onSave={editPackHandler}>
            <TextField onChange={onChangeTextFieldHandler} id="standard-basic" label="Name Pack" variant="standard" />
            <div >
                <FormControlLabel  control={<Checkbox
                    onChange={onChangeCheckboxHandler}/>} label="Private Pack" />
            </div>
        </BasicModal>
    );
}