import axios from "axios";
import {instance} from "../../common/instance/instance";


const from = "test-front-admin <ai73a@yandex.by>";
const message = `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='http://localhost:3000/set-new-password/$token$'>link</a></div>`

export const recoveryPasswordAPI = {
    recoveryPassword(email: string) {
        return instance.post('auth/forgot', {email, from, message})
    }
}
