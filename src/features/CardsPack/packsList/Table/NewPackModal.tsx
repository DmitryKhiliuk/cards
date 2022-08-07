import React from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";

type NewPackModalType = {
    addPack: (name: string) => void
}

export const NewPackModal = (props:NewPackModalType) =>  {

    const onClickSaveHandler = () => {
        props.addPack('111111')
    }

    return (
        <BasicModal name={'Add new pack'}>
            <div style={{display: 'flex', justifyContent: 'space-between' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new pack
                </Typography>
                <IconButton >
                    <CloseIcon/>
                </IconButton>
            </div>
            <TextField id="standard-basic" label="Name Pack" variant="standard" />
            <div >
                <FormControlLabel control={<Checkbox
                />} label="Private Pack" />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
                <Button variant="contained">Cancel</Button>
            </div>

        </BasicModal>
    );
}