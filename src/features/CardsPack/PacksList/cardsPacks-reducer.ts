import {Dispatch} from "redux";
import {cardsPacksApi} from "./cardsPacks-api";
import {setAppInitializedAC, setAppStatusAC} from "../../../app/app-reducer";
import {authApi} from "../../singIn/auth-api";
import {setProfileAC} from "../../profile/profile-reducer";
import {setIsLoggedInAC} from "../../singIn/auth-reducer";


const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}

type InitialStateType = typeof initialState


export const cardsPacksReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET-CARD-PACKS':
            return action.cardPacks
        default:
            return state
    }
};

export const setCardsPacks = (cardPacks:CardsPacksType[]) => ({type:'SET-CARD-PACKS', cardPacks} as const);
export type SetCardsPacksActionType = ReturnType<typeof setCardsPacks>

export const fetchCardsPacksTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await cardsPacksApi.getPacksList()
            console.log(response.data)
            dispatch(setCardsPacks(response.data))
        } catch (error) {
            console.log(error)
        }
    }
};

// export const fetchCardsPacksTC = () => {
//     return (dispatch: Dispatch) => {
//         cardsPacksApi.getPacksList()
//             .then((res) => {
//                 console.log(res.data)
//                 dispatch(setCardsPacks(res.data))
//             })
//             .catch((e) => {
//                 console.log(e)
//             })
//             .finally(() => {
//                 dispatch(setAppInitializedAC(true))
//             })
//
//
//     }
//
// }


export type CardsPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}