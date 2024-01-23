import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchByChatsList, toggleRoom } from '../../../store/slices/chatSlice';
import ChatRoom from './ChatRoom/ChatRoom';

interface ChatsListProps {
    setShowChat: (e: boolean) => void
}

const ChatsList: FC<ChatsListProps> = ({ setShowChat }) => {
    const { user_id } = useAppSelector(state => state.user)
    const { chats_list, room } = useAppSelector(state => state.chat)
    const dispatch = useAppDispatch()


    useEffect(() => {
        user_id && chats_list.length <= 0 && dispatch(fetchByChatsList(user_id))
    }, [dispatch, user_id])
    return (
        <div onClick={(e) => e.stopPropagation()} className='chat_window'>
            <span className='close_chat' onClick={() => setShowChat(false)}>&#x2715;</span>
            {

                room ?
                    <ChatRoom room={room} />
                    :
                    <div className='name_chat'>
                        {
                            chats_list.length > 0 &&
                            chats_list.map(e => (
                                <>
                                    <div
                                        className='chat'
                                        onClick={() => dispatch(toggleRoom(e._id))} key={e._id}>{e.name}</div>
                                </>
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default ChatsList;