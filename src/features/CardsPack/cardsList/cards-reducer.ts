import {packsAPI, PacksQueryParamsType} from "../api-CardsPack";
import {
    cardsAPI,
    CardsQueryParamsType,
    CardsResponseType,
    CardsType, newCardsType
} from "./api-Cards";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import { setOptionsAC, ThunkType} from "../cardsPack-reducer";
import {handleServerAppError} from "../../../utils/error-utils";

const initialState = {
    cardsTableData: {
        cards: [] as CardsType[],
        cardsTotalCount: 0,
        maxGrade: 10,
        minGrade: 0,
        page: 1,
        pageCount: 4,
        packUserId: '',
        sortCards: '0updated',
    },
    options: {pageCount: 10} as CardsQueryParamsType,
    cardsStatus: 'exp' as cardStatusType
}

type initialStateType = typeof initialState

export type cardStatusType = 'exp' | 'none' | 'cards'

export const cardsReducer = (state:initialStateType = initialState, action: ActionCardsType):initialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, cardsTableData: action.cardsTableData}
        case "cards/SET-OPTIONS":
            return {...state, options: {...state.options, ...action.options}}
        case "cards/CARD-STATUS":
            return  {...state, cardsStatus: action.cardStatus}
        default:
            return state
    }
}

type setCardsACType = ReturnType<typeof setCardsAC>
export const setCardsAC = (cardsTableData: CardsResponseType) => {
    return {
        type: 'cards/SET-CARDS',
        cardsTableData
    } as const
}

type setOptionsCardsACType = ReturnType<typeof setOptionsCardsAC>
export const setOptionsCardsAC = (options: CardsQueryParamsType) => {
    return {
        type: 'cards/SET-OPTIONS',
        options
    } as const
}

export type cardStatusACType = ReturnType<typeof cardStatusAC>
export const cardStatusAC = (cardStatus: cardStatusType) => {
    return {
       type: 'cards/CARD-STATUS',
       cardStatus
    } as const
}

export type ActionCardsType = setCardsACType | setOptionsCardsACType | cardStatusACType | ReturnType<typeof setOptionsAC>

export const setCardsTC = (cardsPack_id: string, options?: CardsQueryParamsType) =>
     async (dispatch: Dispatch<ActionCardsType>, getState: () => AppRootStateType) => {
         if (options) {
             dispatch(setOptionsCardsAC(options))
         }
         const { sortCards, page, pageCount,cardQuestion } = getState().cards.options;
         try {
             const response = await cardsAPI.getCards({
                 cardsPack_id,
                 sortCards,
                 page,
                 pageCount,
                 cardQuestion,
             })
             dispatch(setCardsAC(response.data))
             if (response.data.cards.length) {
                 dispatch(cardStatusAC('cards'))
             } else {
                 dispatch(cardStatusAC('none'))
             }

         } catch (error:any) {
             console.log(error)
         }
     }

export const addCardTC = (newCard: newCardsType) => {
    return async (dispatch: Dispatch<ActionCardsType>) => {
        try {
            const res = await cardsAPI.addCards(newCard)
            // @ts-ignore
            dispatch(setCardsTC(res.data.newCard.cardsPack_id))
        } catch (error) {

        }
    }
}

export const deleteCardTC = (cardsPack_id: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await cardsAPI.deleteCards(cardsPack_id)
            dispatch(setCardsTC(res.data.deletedCard.cardsPack_id))
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}