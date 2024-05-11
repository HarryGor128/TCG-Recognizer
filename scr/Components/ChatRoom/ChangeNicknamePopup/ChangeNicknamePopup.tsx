import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import useAsyncStorage from '../../../Hook/Common/useAsyncStorage/useAsyncStorage';
import CustomButton from '../../Common/CustomButton/CustomButton';
import TextComponent from '../../Common/TextComponent/TextComponent';
import TextInputComponent from '../../Common/TextInputComponent/TextInputComponent';

interface ChangeNicknamePopupProps {
    refreshName: Function;
}

const ChangeNicknamePopup = ({ refreshName }: ChangeNicknamePopupProps) => {
    const { t } = useTranslation();

    const [findName, setFindName] = useState<boolean>(false);
    const [changeNickname, setChangeNickname] = useState<string>('');

    const { getData, setData } = useAsyncStorage();

    const getNickname = async () => {
        const nickname = await getData('Nickname');
        setChangeNickname(nickname ? nickname : '');
        setFindName(nickname ? true : false);
    };

    useEffect(() => {
        getNickname();
    }, []);

    const onInput = (text: string) => {
        setChangeNickname(text);
    };

    const onPressSend = async () => {
        await setData('Nickname', changeNickname);
        refreshName();
    };

    return (
        <>
            <TextComponent>
                {t(findName ? 'RemovePrevMsg' : 'SetupNickname')}
            </TextComponent>
            <TextInputComponent value={changeNickname} onChangeText={onInput} />
            <CustomButton
                ContainerStyle={ChangeNicknamePopupStyles.button}
                ButtonText={t('Change')}
                OnPressCallback={onPressSend}
                Disabled={!changeNickname}
            />
        </>
    );
};

export default ChangeNicknamePopup;

const ChangeNicknamePopupStyles = StyleSheet.create({
    textInput: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    button: {
        marginTop: 10,
    },
});
