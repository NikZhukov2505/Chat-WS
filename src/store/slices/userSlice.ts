import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData, UserInfo } from "../modules"
import { authApi } from "../../axios"
import { removeLSToken, setLSToken } from "../../LS"


type UserState = {
    loading: boolean
    error: null | string
    user_id: null | string
    redirect: boolean
    user: UserInfo | null
}

const initialState: UserState = {
    error: null,
    loading: false,
    user_id: null,
    redirect: false,
    user: null,
}

export const fetchByAddNewUser = createAsyncThunk<string, UserData, { rejectValue: string }>(
    'user/fetchByAddNewUser',
    async (userData, { rejectWithValue }) => {
        const res = await authApi.addNewUser(userData)
        console.log(res);
        if (res.status !== 201) {
            return rejectWithValue('Server error')
        }
        return res.data.message as string
    }
)

export const fetchByLogin = createAsyncThunk<string, UserData, { rejectValue: string }>(
    'user/fetchByLogin',
    async (userData, { rejectWithValue }) => {
        const res = await authApi.login(userData)
        // console.log(res.data);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data as string
    }
)

export const fetchByUserData = createAsyncThunk<UserInfo, string, { rejectValue: string }>(
    'user/fetchByUserData',
    async (token, { rejectWithValue }) => {
        const res = await authApi.getUserData(token)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data as UserInfo
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: ({ addCase }) => {
        addCase(fetchByLogin.fulfilled, (state, action) => {
            state.user_id = action.payload
            setLSToken(action.payload)
        })
    }
})


export default userSlice.reducer