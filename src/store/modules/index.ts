export type UserData = {
    name: string
    password: string
}

export type UserInfo = {
    email: string
    first_name: string
    last_name: string
    username: string
}

const chatsData = {
    name: "Levasik2 test chat",
    users: ['b5eb6f54-c442-40e3-ade7-527c349cc15f', 'eae95fe9-9081-4289-a9f7-ac3c91a5a8de'],
    _id: "434b6a66-4664-472b-aacd-37f84bf126a2"
}

export type IChatsData = typeof chatsData

const messagesData = {
    chat_id: "434b6a66-4664-472b-aacd-37f84bf126a2",
    msg: "hi",
    msg_text: '',
    user_id: "b5eb6f54-c442-40e3-ade7-527c349cc15f",
    _id: "0bf326b2-284b-48f6-9038-060079a784c4",
}

export type IMessagesData = typeof messagesData