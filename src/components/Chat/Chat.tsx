import React, { FC, useState } from 'react';
import './Chat.scss'
import ChatsList from './ChatsList/ChatsList';

// const socket = new WebSocket('')

const Chat: FC = () => {
    const [showChat, setShowChat] = useState<boolean>(false)
    return (
        <div onClick={() => setShowChat(!showChat)} className='chat_wrapper'>
            <h5>Тут будет чат!</h5>
            {
                showChat && <ChatsList setShowChat={setShowChat} />
            }
        </div>
    );
};

export default Chat;