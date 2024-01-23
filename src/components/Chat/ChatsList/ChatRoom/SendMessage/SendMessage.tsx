import React, { FC, FormEventHandler, useState } from 'react';
import './SendMessage.scss'

interface SendMessageProps {
    socketRef: WebSocket | undefined
    room: string
    user_id: string | null
}

const SendMessage: FC<SendMessageProps> = ({ socketRef, room, user_id }) => {
    const [value, setValue] = useState('')

    const handleMessage: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (value.trim().length) {
            const data = {
                'user_id': user_id,
                'chat_id': room,
                'msg': value
            }
            socketRef?.send(JSON.stringify(data))
            setValue('')
        }
    }

    return (
        <form onSubmit={handleMessage} className='send_form'>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
            <button>&#8594;</button>
        </form>
    );
};

export default SendMessage;