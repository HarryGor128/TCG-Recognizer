import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import useCameraAlbum from '../../../Hook/Common/useCameraAlbum';
import firebaseService from '../../../Services/Common/firebaseService';
import ChatMessage from '../../../Type/API/ChatMessage';
import ChatMsgType from '../../../Type/API/ChatMsgType';
import UploadFile from '../../../Type/Common/UploadFile';
import { closeLoader, openLoader } from '../../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import dateConverter from '../../../utils/date/dateConverter';
import CustomButton from '../../Common/CustomButton/CustomButton';
import TextComponent from '../../Common/TextComponent/TextComponent';
import TextInputComponent from '../../Common/TextInputComponent/TextInputComponent';
import SendMsgBoxStatus from './SendMsgBoxStatus';

interface SendMsgBoxProps {
    selectMsg: ChatMessage;
    status: SendMsgBoxStatus;
    nickname: string;
    setSelectMsg: Dispatch<SetStateAction<ChatMessage>>;
    setSendMsgStatus: Dispatch<SetStateAction<SendMsgBoxStatus>>;
}

const SendMsgBox = ({
    selectMsg,
    status,
    nickname,
    setSelectMsg,
    setSendMsgStatus,
}: SendMsgBoxProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { openUploadPopup, photo, cleanPhoto } = useCameraAlbum();

    const [sendMsg, setSendMsg] = useState<ChatMessage>(new ChatMessage());

    useEffect(() => {
        switch (status) {
            case 'edit':
                setSendMsg(selectMsg);
                break;
            case 'delete':
                onDeleteMsg();
                break;
            default:
                break;
        }
    }, [status, selectMsg]);

    useEffect(() => {
        if (photo.uri) {
            onUploadPhoto();
        }
    }, [photo]);

    const createSendMsg = (msgType: ChatMsgType): ChatMessage => {
        return {
            ...sendMsg,
            nickname: nickname,
            type: msgType,
            createTime: dateConverter.nowUnixTime(),
            lastUpdate: dateConverter.nowUnixTime(),
        };
    };

    const onTextInput = (text: string) => {
        setSendMsg((prev) => {
            return { ...prev, msg: text };
        });
    };

    const onPressSendText = async () => {
        const result =
            status === 'add'
                ? await firebaseService.addDoc(
                      'chat',
                      createSendMsg('text'),
                      'id',
                  )
                : await firebaseService.updateDoc('chat', sendMsg.id, {
                      ...sendMsg,
                      lastUpdate: dateConverter.nowUnixTime(),
                  });

        if (result.result) {
            onPressEndEditMsg();
        } else {
            Alert.alert(t('NetworkError'), t('NetworkError'));
        }
    };

    const onPressEndEditMsg = () => {
        setSendMsgStatus('add');
        setSelectMsg(new ChatMessage());
        setSendMsg(new ChatMessage());
    };

    const onDeleteMsg = async () => {
        const result = await firebaseService.deleteDoc('chat', selectMsg.id);

        if (result.result) {
            onPressEndEditMsg();
        } else {
            Alert.alert(t('NetworkError'), t('NetworkError'));
        }
    };

    const onPressUploadPhoto = () => {
        openUploadPopup();
    };

    const onUploadPhoto = async () => {
        dispatch(openLoader());
        const uploadFile: UploadFile = {
            fileType: photo.type ? photo.type.split('/')[1] : '',
            fileName: dateConverter.nowFileName(),
            uploadFilePath: photo.uri ? photo.uri : '',
        };

        const uploadResult = await firebaseService.uploadFile(
            'Chat',
            uploadFile,
        );

        if (uploadResult.result) {
            const result = await firebaseService.addDoc(
                'chat',
                {
                    ...createSendMsg('img'),
                    msg: uploadResult.data,
                },
                'id',
            );
            if (result.result) {
                onPressEndEditMsg();
            } else {
                Alert.alert(t('NetworkError'), t('NetworkError'));
            }
        }

        cleanPhoto();
        dispatch(closeLoader());
    };

    return (
        <View style={SendMsgBoxStyles.mainContainer}>
            {status === 'edit' && (
                <View style={SendMsgBoxStyles.row}>
                    <TextComponent style={{ flex: 1 }}>{`${t(
                        'EditMessageIn',
                    )}\n${dateConverter.unixTimeToDateString(
                        sendMsg.createTime,
                        dateConverter.chatRoomDateFormat(sendMsg.createTime),
                    )}`}</TextComponent>
                    <CustomButton
                        OnPressCallback={onPressEndEditMsg}
                        Icon={['fas', 'xmark']}
                        IconSize={25}
                        IconColor={ColorConstant.Text.Blue.Dark}
                        ButtonContainerStyle={SendMsgBoxStyles.button}
                        Disabled={!sendMsg.msg}
                    />
                </View>
            )}
            <View style={SendMsgBoxStyles.row}>
                <TextInputComponent
                    value={sendMsg.msg}
                    onChangeText={onTextInput}
                    placeholder={t('Message')}
                    placeholderTextColor={ColorConstant.Text.Grey.Dark}
                    multiline
                    style={SendMsgBoxStyles.textarea}
                />
                <CustomButton
                    OnPressCallback={onPressUploadPhoto}
                    Icon={['fas', 'images']}
                    IconSize={30}
                    IconColor={ColorConstant.Text.Blue.Dark}
                    ButtonContainerStyle={SendMsgBoxStyles.button}
                />
                <CustomButton
                    OnPressCallback={onPressSendText}
                    Icon={['fas', 'paper-plane']}
                    IconSize={30}
                    IconColor={ColorConstant.Text.Blue.Dark}
                    ButtonContainerStyle={SendMsgBoxStyles.button}
                    Disabled={!sendMsg.msg}
                />
            </View>
        </View>
    );
};

export default SendMsgBox;

const SendMsgBoxStyles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    textarea: {
        flex: 1,
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        minHeight: 30,
        maxHeight: 100,
    },

    button: {
        padding: 0,
        marginHorizontal: 10,
        backgroundColor: ColorConstant.Transparent.Clear,
    },
});
