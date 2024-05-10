import { Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import ColorConstant from '../../../Constant/ColorConstant';
import ChatMessage from '../../../Type/API/ChatMessage';
import TextComponent from '../../Common/TextComponent/TextComponent';
import MsgWrapper from '../MsgWrapper/MsgWrapper';

interface TextMsgProps {
    nickname: string;
    chatMsg: ChatMessage;
}

const TextMsg = ({ nickname, chatMsg }: TextMsgProps) => {
    const onPressLink = (url: string) => {
        console.log('🚀 ~ file: TextMsg.tsx:16 ~ onPressLink ~ url:', url);
        Linking.openURL(url);
    };

    return (
        <MsgWrapper nickname={nickname} chatMsg={chatMsg}>
            <Hyperlink
                linkStyle={{ color: ColorConstant.Text.Blue.Light }}
                onPress={onPressLink}
            >
                <TextComponent
                    style={{
                        color:
                            chatMsg.nickname === nickname
                                ? ColorConstant.Text.White.Normal
                                : ColorConstant.Text.Black.Normal,
                    }}
                >
                    {chatMsg.msg}
                </TextComponent>
            </Hyperlink>
        </MsgWrapper>
    );
};

export default TextMsg;
