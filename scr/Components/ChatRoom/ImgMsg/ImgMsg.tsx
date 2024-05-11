import { Image, View, useWindowDimensions } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import ChatMessage from '../../../Type/API/ChatMessage';
import MsgWrapper from '../MsgWrapper/MsgWrapper';

interface ImgMsgProps {
    nickname: string;
    chatMsg: ChatMessage;
}

const ImgMsg = ({ nickname, chatMsg }: ImgMsgProps) => {
    const { width } = useWindowDimensions();

    return (
        <MsgWrapper nickname={nickname} chatMsg={chatMsg}>
            <View style={{ backgroundColor: ColorConstant.Transparent.Black }}>
                <Image
                    source={{ uri: chatMsg.msg }}
                    style={{
                        width: width * 0.6,
                        height: 300,
                    }}
                    resizeMode={'contain'}
                />
            </View>
        </MsgWrapper>
    );
};

export default ImgMsg;
