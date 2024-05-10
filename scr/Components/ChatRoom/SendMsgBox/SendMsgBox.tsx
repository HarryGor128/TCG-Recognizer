import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import ChatMessage from '../../../Type/API/ChatMessage';
import TextInputComponent from '../../Common/TextInputComponent/TextInputComponent';
import SendMsgBoxStatus from './SendMsgBoxStatus';

interface SendMsgBoxProps {
    selectMsg: ChatMessage;
    status: SendMsgBoxStatus;
}

const SendMsgBox = ({ selectMsg, status }: SendMsgBoxProps) => {
    const { t } = useTranslation();

    const [sendMsg, setSendMsg] = useState<ChatMessage>(new ChatMessage());

    useEffect(() => {
        if (status === 'edit') {
            setSendMsg(selectMsg);
        }
    }, [status, selectMsg]);

    const onTextInput = (text: string) => {
        setSendMsg((prev) => {
            return { ...prev, msg: text };
        });
    };

    return (
        <View style={SendMsgBoxStyles.mainContainer}>
            <TextInputComponent
                value={sendMsg.msg}
                onChangeText={onTextInput}
                placeholder={t('Message')}
                placeholderTextColor={ColorConstant.Text.Grey.Dark}
            />
        </View>
    );
};

export default SendMsgBox;

const SendMsgBoxStyles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },
});
