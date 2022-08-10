import React from 'react';
import {SING_UP} from "../routes/routes";
import Button from "@mui/material/Button";

type ButtonLearnPropsType = {
    onClick: () => void,
    label: string
};

export const ButtonLearn = ({onClick, label}: ButtonLearnPropsType) => {
    return (
        <Button variant={'text'} color={'primary'}
                onClick={() => {}}>
            {label}
        </Button>
    )
}