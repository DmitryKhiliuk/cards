import axios from "axios";
import {ResponseProfileType} from "../profile/profile-reducer";
const instance = axios.create({
    withCredentials: true,
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://back-from-friday-project.herokuapp.com/2.0/'
})

export const signUpApi = {

    registration(email: string, password: string) {
        return instance.post<ResponseProfileType>('auth/register', {email, password})
    }
}

