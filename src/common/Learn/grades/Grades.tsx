import React, {ChangeEvent} from 'react';
import {v1} from "uuid";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, RadioGroup} from "@mui/material";
import Radio from '@mui/material/Radio';

type GradesPropsType = {
    setGrade: () => void
};

const grades = [
    { id: v1(), value: 1, label: 'Did not know' },
    { id: v1(), value: 2, label: 'Forgot' },
    { id: v1(), value: 3, label: 'A lot of thought' },
    { id: v1(), value: 4, label: 'Confused' },
    { id: v1(), value: 5, label: 'Knew the answer' },
];

export const Grades = ({setGrade}) => {
    const onChangeRadioHandle = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade(+event.target.value)
    }
    return (
        <FormControl>
            <FormLabel>Rate yourself:</FormLabel>
            <RadioGroup onChange={onChangeRadioHandle}>
                {grades.map(grade => (
                    <FormControlLabel
                        key={grade.id}
                        value={grade.value}
                        control={<Radio />}
                        label={grade.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}