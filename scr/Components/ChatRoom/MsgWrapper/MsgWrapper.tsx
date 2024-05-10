import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import ChatMessage from '../../../Type/API/ChatMessage';
import dateConverter from '../../../utils/date/dateConverter';
import TextComponent from '../../Common/TextComponent/TextComponent';

interface MsgWrapperProps {
    chatMsg: ChatMessage;
    nickname: string;
    children: ReactNode;
}

const MsgWrapper = ({ chatMsg, nickname, children }: MsgWrapperProps) => {
    const { t } = useTranslation();

    return (
        <View
            style={{
                alignItems:
                    chatMsg.nickname === nickname ? 'flex-end' : 'flex-start',
            }}
        >
            <TextComponent style={MsgWrapperStyles.nickname}>
                {chatMsg.nickname}
            </TextComponent>
            <View
                style={[
                    MsgWrapperStyles.msgBox,
                    {
                        backgroundColor:
                            chatMsg.nickname === nickname
                                ? ColorConstant.BG.Blue.Dark
                                : ColorConstant.BG.Grey.Normal,
                    },
                ]}
            >
                {children}
            </View>
            <TextComponent style={MsgWrapperStyles.dateTime}>{`${
                chatMsg.lastUpdate > chatMsg.createTime ? `${t('Edited')} ` : ''
            }${dateConverter.unixTimeToDateString(
                chatMsg.createTime,
                dateConverter.chatRoomDateFormat(chatMsg.createTime),
            )}`}</TextComponent>
        </View>
    );
};

export default MsgWrapper;

const MsgWrapperStyles = StyleSheet.create({
    msgBox: {
        maxWidth: '70%',
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
    },

    nickname: {
        color: ColorConstant.Text.White.Normal,
    },

    dateTime: {
        color: ColorConstant.Text.White.Normal,
    },
});
