import React, {useState} from 'react';
import {useAppSelector} from "../hooks/hooks";
import {AppRootStateType} from "../../app/store";
import {Grades} from "./grades/Grades";
import {LearnHeader} from "./LearnHeader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import {CARDS} from "../routes/routes";
import {useNavigate} from "react-router-dom";


export const Learn = () => {
    const cards = useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.cards);
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [grade, setGrade] = useState(1);

    const rand = Math.floor(Math.random() * cards.length);
    const card = cards[rand];

    const onClickHandler = () => navigate(CARDS);
    const onShowAnswer = () => setIsChecked(true);
    const onNext = () =>

    return (
        <div>
            <div>
                <Button variant="contained" size={"small"} style={{width: '75px'}}
                        startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                    BACK
                </Button>
            </div>
            <h3>Learn 'PackName'</h3>
            <div>
                {'fhfbfbfb'
                    ? <LearnHeader card={card} onClick={onShowAnswer} buttonLabel={'Show answer'}/>
                    : (<LearnHeader card={card} onClick={onNext} buttonLabel={'Next'}>
                        <div>
                            <div>
                                <h4>Answer:</h4>
                                <p>{card.answer}</p>
                            </div>
                            <Grades setGrade={setGrade}/>
                        </div>
                    </LearnHeader>
                    )}
            </div>
        </div>
    );
};