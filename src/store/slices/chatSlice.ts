import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../../axios"
import axios from "axios"
import { IChatsData, IMessagesData } from "../modules"


type UserState = {
    loading: boolean
    error: null | string
    chats_list: IChatsData[]
    room: string | null
    messages: IMessagesData[]
}

const initialState: UserState = {
    error: null,
    loading: false,
    chats_list: [],
    room: null,
    messages: []
}

export const fetchByChatsList = createAsyncThunk<IChatsData[], string, { rejectValue: string }>(
    'user/fetchByChatsList',
    async (user_id, { rejectWithValue }) => {
        const res = await authApi.getChatsList(user_id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data as IChatsData[]
    }
)

export const fetchByListMessagesRoom = createAsyncThunk<IMessagesData[], string, { rejectValue: string }>(
    'user/fetchByListMessagesRoom',
    async (room, { rejectWithValue }) => {
        const res = await authApi.getMessages(room)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data as IMessagesData[]
    }
)


const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleRoom(state, action: PayloadAction<string | null>) {
            state.room = action.payload
        },
        deleteMessages(state) {
            state.messages = []
        },
        addNewMessageInList(state, action) {
            state.messages.push(action.payload)
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchByChatsList.fulfilled, (state, action) => {
            state.chats_list = action.payload
        })
        // ==========================================
        addCase(fetchByListMessagesRoom.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
})

export const { toggleRoom, deleteMessages, addNewMessageInList } = chatSlice.actions


export default chatSlice.reducer