import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ChatMsgRenderer from '../../Components/ChatRoom/ChatMsgRenderer/ChatMsgRenderer';
import SendMsgBox from '../../Components/ChatRoom/SendMsgBox/SendMsgBox';
import SendMsgBoxStatus from '../../Components/ChatRoom/SendMsgBox/SendMsgBoxStatus';
import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useChatRoomMessage from '../../Hook/useChatRoomMessage';
import useNickname from '../../Hook/useNickname';
import firebaseService from '../../Services/Common/firebaseService';
import ChatMessage from '../../Type/API/ChatMessage';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ChatRoom'>;

const ChatRoomScreen = ({ navigation }: NavigationProps) => {
    const listRef = useRef<FlatList<ChatMessage>>(null);

    const { nickname, getNickname, onPressChangeNickname } = useNickname();

    const { chatMessage } = useChatRoomMessage();
    const dispatch = useAppDispatch();
    useAndroidBackButton(() => {
        navigation.goBack();
    });

    const [chatList, setChatList] = useState<ChatMessage[]>([]);
    const [selectMsg, setSelectMsg] = useState<ChatMessage>(new ChatMessage());
    const [sendMsgStatus, setSendMsgStatus] = useState<SendMsgBoxStatus>('add');

    const scrollListToEnd = async () => {
        if (listRef.current !== null) {
            if (chatMessage.changeType === 'added') {
                listRef.current.scrollToIndex({ index: 0 });
            }
        }
    };

    const getMsgList = async () => {
        const result = await firebaseService.getCollection(
            'chat',
            'createTime',
            true,
        );
        setChatList(result.data);
    };

    useEffect(() => {
        dispatch(openLoader());
        getMsgList();
        getNickname();
        dispatch(closeLoader());
    }, []);

    useEffect(() => {
        if (chatMessage) {
            const idList = chatList.map((row) => row.id);

            setChatList((prev) => {
                let newList = prev;

                switch (chatMessage.changeType) {
                    case 'added':
                        if (!idList.includes(chatMessage.data.id)) {
                            newList.unshift(chatMessage.data);
                        }
                        break;
                    case 'modified':
                        const findIndex = idList.findIndex(
                            (item) => item === chatMessage.data.id,
                        );
                        newList[findIndex] = chatMessage.data;
                        break;
                    case 'removed':
                        newList = newList.filter(
                            (item) => item.id !== chatMessage.data.id,
                        );
                        break;
                    default:
                        break;
                }

                return newList;
            });
        }
    }, [chatMessage]);

    return (
        <View style={ChatRoomScreenStyles.mainContainer}>
            <AppHeader
                Title={nickname}
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                RightStack={
                    <CustomButton
                        OnPressCallback={onPressChangeNickname}
                        Icon={['fas', 'signature']}
                        IconSize={30}
                        IconColor={ColorConstant.Text.White.Normal}
                        ButtonContainerStyle={{
                            padding: 0,
                            backgroundColor: ColorConstant.Transparent.Clear,
                        }}
                    />
                }
            />
            <FlatList
                inverted
                style={{ flex: 1 }}
                data={chatList}
                renderItem={(list) => (
                    <ChatMsgRenderer
                        chatMsg={list.item}
                        nickname={nickname}
                        setSelectMsg={setSelectMsg}
                        setSendMsgStatus={setSendMsgStatus}
                    />
                )}
                keyExtractor={(_, index) => index.toString()}
                ref={listRef}
                onContentSizeChange={scrollListToEnd}
            />
            <SendMsgBox
                nickname={nickname}
                selectMsg={selectMsg}
                status={sendMsgStatus}
                setSelectMsg={setSelectMsg}
                setSendMsgStatus={setSendMsgStatus}
            />
        </View>
    );
};

export default ChatRoomScreen;

const ChatRoomScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },
});
