import {instance} from "../../common/instance/instance";
import {AxiosResponse} from "axios";

const from = "test-front-admin <ai73a@yandex.by>";
const message = `<div style="background-color: lime; padding: 15px">
password recovery link:  <a href='https://dmitrykhiliuk.github.io/cards/#/set-new-password/$token$'>link</a></div>`
//'http://localhost:3000/set-new-password/$token$'
//'https://DmitryKhiliuk.github.io/cards/set-new-password/$token$'

export const recoveryPasswordAPI = {
    recoveryPassword(email: string) {
        return instance.post<{email: string, from: string, message: string}, AxiosResponse<ResponseRecoveryPasswordType>>('auth/forgot', {email, from, message})
    }
};

type ResponseRecoveryPasswordType = {
    email: string,
    from: string,
    message: string
}
