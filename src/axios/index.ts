import axios from "axios";
import { UserData } from '../store/modules'

const instanse = axios.create({
    baseURL: 'http://185.22.67.32:8000/',
    headers: {
        "Content-Type": 'application/json',
    }
})

export const authApi = {
    addNewUser(userData: UserData) {
        return instanse.post('user/registration/', userData)
    },
    login(userData: UserData) {
        return instanse.post('login', userData)
    },
    getUserData(token: string) {
        const headers = { "Authorization": `Bearer ${token}` }
        return instanse.get('user/user_profile/profile/', { headers })
    },
    getChatsList(user_id: string) {
        return instanse.get(`my_chats/${user_id}`)
    },
    getMessages(room: string) {
        return instanse.get(`get_msg?chat_id=${room}`)
    }
}