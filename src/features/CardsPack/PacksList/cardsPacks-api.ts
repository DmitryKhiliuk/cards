import axios, { AxiosResponse } from 'axios'
import {instance} from "../../../common/instance/instance";

export const cardsPacksApi = {
    getPacksList() {
        return instance.get('/cards/pack', {params: {
            page: 1
            }});
    }
}