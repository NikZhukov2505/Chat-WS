import React, { FC, FormEventHandler, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchByLogin } from '../../store/slices/userSlice';
import { UserData } from '../../store/modules';

const Login: FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        password: ''
    })
    const dispatch = useAppDispatch()
    const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (userData.name.trim().length && userData.password.trim().length) {
            dispatch(fetchByLogin(userData))
        }
        setUserData({
            name: '',
            password: ''
        })
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <input
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    type="text" placeholder='name' />
                <input
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    type="password" placeholder='pass' />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;