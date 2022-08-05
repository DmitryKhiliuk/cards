import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ActionProfileType, profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {signUpReducer} from "../features/singUp/signUp-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {ActionNewPassType, resetPasswordReducer} from "../features/newPassword/newPassword-reducer";
import {ActionRecPassType, passwordRecoverReducer} from "../features/recoveryPassword/recoveryPassword-reducer";
import {ActionsAuthType, authReducer} from "../features/singIn/auth-reducer";
import {ActionPacksType, packsReducer} from "../features/CardsPack/cardsPack-reducer";
import {ActionCardsType, cardsReducer} from "../features/CardsPack/cardsList/cards-reducer";
import {useDispatch} from "react-redux";




export const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    registration:signUpReducer,
    auth: authReducer,
    recoveryPass:passwordRecoverReducer,
    newPass:resetPasswordReducer,
    cardsPack:packsReducer,
    packs: packsReducer,
    cards: cardsReducer
})

//Для DEVTools  Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//


export type ActionType = ActionsAuthType |
    ActionPacksType |
    ActionCardsType |
    ActionRecPassType |
    ActionProfileType |
    ActionNewPassType


// export const store = createStore(rootReducer)

export const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


export type AppActionType = ActionType

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();


// @ts-ignore
window.store = store;