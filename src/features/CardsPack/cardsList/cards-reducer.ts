import {packsAPI, PacksQueryParamsType} from "../api-CardsPack";
import {
    cardsAPI,
    CardsQueryParamsType,
    CardsResponseType,
    CardsType, newCardsType
} from "./api-Cards";
import {Action, Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {getPacksTC, setOptionsAC, ThunkType} from "../cardsPack-reducer";
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
    isFetching: false,
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
export const setOptionsCardsAC = (options: PacksQueryParamsType) => {
    return {
        type: 'cards/SET-OPTIONS',
        options
    } as const
}

type cardStatusACType = ReturnType<typeof cardStatusAC>
const cardStatusAC = (cardStatus: cardStatusType) => {
    return {
       type: 'cards/CARD-STATUS',
       cardStatus
    } as const
}

export type ActionCardsType = setCardsACType | setOptionsCardsACType | cardStatusACType | ReturnType<typeof setOptionsAC>

export const setCardsTC = (cardsPack_id: string, options?: PacksQueryParamsType) =>
     async (dispatch: Dispatch<ActionCardsType>, getState: () => AppRootStateType) => {
         if (options) {
             dispatch(setOptionsAC(options))
         }
         const { sortCards, page, pageCount } = getState().cards.options;
         try {
             const response = await cardsAPI.getCards({
                 cardsPack_id,
                 sortCards,
                 page,
                 pageCount,
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
            dispatch(getPacksTC())
        } catch (error) {

        }
    }
}

export const deleteCardTC = (cardsPack_id: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await cardsAPI.deleteCards(cardsPack_id)
            dispatch(getPacksTC())
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}