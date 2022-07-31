import {RequestStatusType} from "../../app/app-reducer";
import {Action, Dispatch} from "redux";
import {cardsPackAPI} from "./cardsPack-api";


export type PackType = {
    cardsCount: number | null
    created: Date | null
    deckCover: string | null
    grade: number | null
    more_id: string | null
    name: string | null
    path: string | null
    private: boolean
    rating: number | null
    shots: number | null
    type: string | null
    updated: Date | null
    user_id: string | null
    user_name: string | null
    __v: number | null
    _id: string
}

export type initialStateCardPackType = {
    error: string | null
    status: RequestStatusType
    cardPacks: Array<PackType>
    searchName: string
    min: number
    max: number
    sortPacks: string
    page: number
    packsPerPage: number
    currentPage: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    packCardsId: string
    packUserId: string
}
const initialState: initialStateCardPackType = {
    error: null,
    status: 'idle',
    cardPacks: [],
    searchName: '',
    min: 0,
    max: 24,
    sortPacks: '',
    page: 1,
    packsPerPage: 10,
    currentPage: 1,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 24,
    packCardsId: '',
    packUserId: '',
}



export const cardsPackReducer = (state: initialStateCardPackType = initialState, action: getCardsACType ):initialStateCardPackType => {
    switch (action.type){
        case "cardsPack/GET-CARDS":
            return action.cardsPack
        default:
            return state
    }

}
export type getCardsACType = ReturnType<typeof getCardsAC>
export const getCardsAC = (cardsPack: initialStateCardPackType) => {
    return {
        type: 'cardsPack/GET-CARDS',
        cardsPack
    } as const
}


export const getCardsTC = () => async (dispatch: Dispatch) => {
    try {
        let response = await cardsPackAPI.getCards()
        dispatch(getCardsAC(response.data))
    } catch (error) {
        console.log(error)
    }
}