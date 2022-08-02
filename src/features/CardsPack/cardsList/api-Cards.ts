import {AxiosResponse} from "axios";
import {instance} from "../../../common/instance/instance";


export const cardsAPI = {
    getCards(idPack: string) {
        return instance.get<CardsResponseType, AxiosResponse<CardsResponseType>>(`cards/pack?cardsPack_id=${idPack}`)
    },
    addPCards(newCard: newCardsType) {
        return instance.post('cards/card', {card: newCard})
    },
    deleteCards(idCard: string) {
        return instance.delete(`cards/card?id=${idCard}`)
    },
    updateCards(updateCard: updateCardsType) {
        return instance.put('cards/pack', {cardsPack: updateCard})
    }
}

export type CardsType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    comments: string,
    type: string,
    rating: number,
    more_id: string,
    created: Date,
    updated: Date,
    __v: number,
    answerImg: string,
    answerVideo: string,
    questionImg: string,
    questionVideo: string
}

export type CardsResponseType = {
    cards: CardsType[]
    packUserId: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    minGrade: number,
    maxGrade: number
    token: string,
    tokenDeathTime: number
}

export type newCardsType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}

export type updateCardsType = {
    card: {
        _id: string
        question?: string
        answer?: string
        comments?: string
    }
}