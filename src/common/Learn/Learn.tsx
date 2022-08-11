import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {AppRootStateType} from "../../app/store";
import {Grades} from "./grades/Grades";
import {LearnHeader} from "./LearnHeader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import {CARDS} from "../routes/routes";
import {useNavigate} from "react-router-dom";
import {getCardsTC, updateGradeTC} from "../../features/CardsPack/cardsList/cardsReducer";
import {CardsType} from "../../features/CardsPack/cardsList/apiCards";

const maxGradeValue = 6;
const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce(
        (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade),
        0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }, {sum: 0, id: -1});
    return cards[res.id + 1];
};

export const Learn = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.cards);
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [grade, setGrade] = useState(1);
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        questionImg: '',
        answerImg: '',
        answerVideo: '',
        questionVideo: '',
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
    });

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(card._id));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    // }, [dispatch, cards, first, card._id]);
    }, []);

    if (cards.length > 0) {
        setCard(getCard(cards));
    }

    // const rand = Math.floor(Math.random() * cards.length);
    // const newCard = cards[rand];

    const onClickHandler = () => navigate(CARDS);
    const onShowAnswer = () => setIsChecked(true);
    console.log(isChecked)
    const onNext = () => {
        dispatch(updateGradeTC({grade, card_id: card._id}));
        setIsChecked(false);
    };

    return (
        <div style={{background:'white'}}>
            <div>
                <Button variant="contained" size={"small"} style={{width: '75px'}}
                        startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                    BACK
                </Button>
            </div>
            <h3>Learn 'PackName'</h3>
            <div>
                {!isChecked
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