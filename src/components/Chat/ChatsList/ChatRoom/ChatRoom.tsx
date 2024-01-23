import React, { ClassAttributes, FC, LegacyRef, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addNewMessageInList, deleteMessages, fetchByListMessagesRoom, toggleRoom } from '../../../../store/slices/chatSlice';
import './ChatRoom.scss'
import SendMessage from './SendMessage/SendMessage';

interface ChatRoomProps {
    room: string
}

const ChatRoom: FC<ChatRoomProps> = ({ room }) => {
    const socketRef = useRef<WebSocket>()
    const messagesRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const { messages } = useAppSelector(state => state.chat)
    const { user_id } = useAppSelector(state => state.user)
    // console.log(messages);

    const handleBack = () => {
        dispatch(toggleRoom(null))
        dispatch(deleteMessages())
    }


    useEffect(() => {
        dispatch(fetchByListMessagesRoom(room))
    }, [dispatch, room])

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = new WebSocket(`ws://185.22.67.32:8000/ws/${room}/${user_id}`);
        }

        socketRef.current.onmessage = (e) => {
            let data = e.data
            data = JSON.parse(data)
            dispatch(addNewMessageInList(data))
            // console.dir(messagesRef.current);
            // console.log(messagesRef.current && messagesRef.current.scrollHeight + 200);

            messagesRef.current?.scrollTo({
                top: messagesRef.current.scrollHeight + 500,
                behavior: "smooth",
            })
        }

        // return () => socketRef.current && socketRef.current.close()
    })

    return (
        <div className='top_wrapper'>
            <div ref={messagesRef} className='messages_wrapper'>
                <span
                    className='back'
                    onClick={handleBack} style={{ fontSize: '30px' }}>&#8592;</span>
                {
                    messages.length > 0 &&
                    messages.map(e => (
                        <span className={`message_default ${user_id === e.user_id ? 'my_message' : 'msg_opponent'}`}
                            key={e._id}>{e.msg || e.msg_text}</span>
                    ))

                }
            </div>
            <SendMessage socketRef={socketRef.current} room={room} user_id={user_id} />
        </div>
    );
};

export default ChatRoom;