

import {instance} from "../../common/instance/instance";
import {initialStateCardPackType} from "./cardsPack-reducer";



export const cardsPackAPI= {

    getCards() {
        return instance.get<initialStateCardPackType>('/cards/pack?pageCount=1000')
    },

}

