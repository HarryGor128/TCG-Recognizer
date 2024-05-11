import { Dispatch, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ChatMsgType from '../../../Type/API/ChatMsgType';
import AppPopupContext from '../../Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Common/CustomButton/CustomButton';
import SendMsgBoxStatus from '../SendMsgBox/SendMsgBoxStatus';

interface MsgOptionPopupProps {
    msgType: ChatMsgType;
    setSendMsgStatus: Dispatch<SetStateAction<SendMsgBoxStatus>>;
}

const MsgOptionPopup = ({ msgType, setSendMsgStatus }: MsgOptionPopupProps) => {
    const { setShowPopup } = useContext(AppPopupContext);

    const { t } = useTranslation();

    const onPressButton = (type: SendMsgBoxStatus) => {
        setSendMsgStatus(type);
        setShowPopup(false);
    };

    return (
        <View>
            {msgType === 'text' && (
                <CustomButton
                    OnPressCallback={() => onPressButton('edit')}
                    ButtonText={t('EditMessage')}
                    Icon={['fas', 'pen-to-square']}
                    ContainerStyle={MsgOptionPopupStyles.button}
                />
            )}
            <CustomButton
                OnPressCallback={() => onPressButton('delete')}
                ButtonText={t('DeleteMessage')}
                Icon={['fas', 'trash-can']}
                ContainerStyle={MsgOptionPopupStyles.button}
            />
        </View>
    );
};

export default MsgOptionPopup;

const MsgOptionPopupStyles = StyleSheet.create({
    button: {
        marginVertical: 20,
    },
});
