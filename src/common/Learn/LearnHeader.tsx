import React from 'react';
import Paper from '@mui/material/Paper/Paper';
import {CardsType} from "../../features/CardsPack/cardsList/apiCards";
import {ButtonLearn} from "./ButtonLearn";

type LearnHeaderPropsType = {
    card: CardsType,
    onClick: () => void,
    buttonLabel: string,
    children?: any
};

export const LearnHeader = ({card, onClick, buttonLabel, children}: LearnHeaderPropsType) => {
    return (
        <Paper elevation={3}>
            <div>
                <h4>Question:</h4>
                <p>{card.question}</p>
            </div>
            <div>
                <p>Number of attempts to answer the question: {card.shots}</p>
            </div>
            {children}
            <ButtonLearn onClick={onClick} label={buttonLabel}/>
        </Paper>
    )
};