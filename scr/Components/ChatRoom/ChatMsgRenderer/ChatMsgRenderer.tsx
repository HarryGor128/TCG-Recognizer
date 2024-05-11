import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';

import ChatMessage from '../../../Type/API/ChatMessage';
import AppPopupContext from '../../Common/AppPopup/Context/AppPopupContext';
import ImgMsg from '../ImgMsg/ImgMsg';
import MsgOptionPopup from '../MsgOptionPopup/MsgOptionPopup';
import SendMsgBoxStatus from '../SendMsgBox/SendMsgBoxStatus';
import TextMsg from '../TextMsg/TextMsg';

interface ChatMsgRendererProps {
    chatMsg: ChatMessage;
    nickname: string;
    setSelectMsg: Dispatch<SetStateAction<ChatMessage>>;
    setSendMsgStatus: Dispatch<SetStateAction<SendMsgBoxStatus>>;
}

const ChatMsgRenderer = ({
    chatMsg,
    nickname,
    setSelectMsg,
    setSendMsgStatus,
}: ChatMsgRendererProps) => {
    const { t } = useTranslation();

    const [showViewer, setShowViewer] = useState<boolean>(false);

    const { setShowPopup, setPopupTitle, setPopupContent } =
        useContext(AppPopupContext);

    const onPressMsg = () => {
        if (chatMsg.type === 'img') {
            setShowViewer(true);
        }
    };

    const onLongPressMsg = () => {
        if (chatMsg.nickname === nickname) {
            setSelectMsg(chatMsg);
            setPopupTitle(t('Option'));
            setPopupContent(
                <MsgOptionPopup
                    msgType={chatMsg.type}
                    setSendMsgStatus={setSendMsgStatus}
                />,
            );
            setShowPopup(true);
        }
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
        <>
            <TouchableOpacity
                style={ChatMsgRendererStyles.msgContainer}
                onPress={onPressMsg}
                onLongPress={onLongPressMsg}
            >
                {chatMsgSwitch()}
            </TouchableOpacity>
            <ImageView
                images={[{ uri: chatMsg.msg }]}
                imageIndex={0}
                visible={showViewer}
                onRequestClose={() => setShowViewer(false)}
            />
        </>
    );
};

export default ChatMsgRenderer;

const ChatMsgRendererStyles = StyleSheet.create({
    msgContainer: {
        padding: 10,
    },
});
