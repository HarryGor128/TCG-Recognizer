import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import ChatMessage from '../../../Type/API/ChatMessage';
import ImgMsg from '../ImgMsg/ImgMsg';
import TextMsg from '../TextMsg/TextMsg';

interface ChatMsgRendererProps {
    chatMsg: ChatMessage;
    nickname: string;
    setSelectMsg: Dispatch<SetStateAction<ChatMessage>>;
}

const ChatMsgRenderer = ({
    chatMsg,
    nickname,
    setSelectMsg,
}: ChatMsgRendererProps) => {
    const onLongPressMsg = () => {
        setSelectMsg(chatMsg);
    };

    const chatMsgSwitch = () => {
        switch (chatMsg.type) {
            case 'text':
                return <TextMsg nickname={nickname} chatMsg={chatMsg} />;
            case 'img':
                return <ImgMsg nickname={nickname} chatMsg={chatMsg} />;
            default:
                return <></>;
        }
    };

    return (
        <TouchableOpacity
            style={ChatMsgRendererStyles.msgContainer}
            onLongPress={onLongPressMsg}
        >
            {chatMsgSwitch()}
        </TouchableOpacity>
    );
};

export default ChatMsgRenderer;

const ChatMsgRendererStyles = StyleSheet.create({
    msgContainer: {
        padding: 10,
    },
});
