import { useEffect, useState } from 'react';

import FirebaseRealTimeMsg from '../Type/API/FirebaseRealTimeMsg';

import firebaseService from '../Services/Common/firebaseService';

const useChatRoomMessage = () => {
    const [chatMessage, setChatMessage] = useState<FirebaseRealTimeMsg>(
        new FirebaseRealTimeMsg(),
    );

    const onChatUpdate = (data: FirebaseRealTimeMsg) => {
        console.log(
            '🚀 ~ file: useChatRoomMessage.ts:27 ~ useChatRoomMessage ~ data:',
            data,
        );
        setChatMessage(data);
    };

    const onChatError = (error: Error) => {
        console.log(
            '🚀 ~ file: useChatRoomMessage.ts:26 ~ onChatError ~ error:',
            error,
        );
    };

    useEffect(() => {
        const chatRoomSignal = firebaseService.getCollectionRealtimeUpdate(
            'chat',
            onChatUpdate,
            onChatError,
        );
        console.log(
            '🚀 ~ file: useChatRoomMessage.ts:33 ~ useEffect ~ chatRoomSignal:',
            chatRoomSignal,
        );

        return () => chatRoomSignal.data();
    }, []);

    return { chatMessage };
};

export default useChatRoomMessage;
