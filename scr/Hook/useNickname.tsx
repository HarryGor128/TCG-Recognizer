import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChangeNicknamePopup from '../Components/ChatRoom/ChangeNicknamePopup/ChangeNicknamePopup';
import AppPopupContext from '../Components/Common/AppPopup/Context/AppPopupContext';

import useAsyncStorage from './Common/useAsyncStorage/useAsyncStorage';

const useNickname = () => {
    const { t } = useTranslation();

    const { getData } = useAsyncStorage();

    const {
        setShowPopup,
        setTitleIcon,
        setPopupTitle,
        setPopupContent,
        setDisablePressBackgroundClose,
    } = useContext(AppPopupContext);

    const [nickname, setNickname] = useState<string>('');

    const getNickname = async () => {
        const nickname = await getData('Nickname');
        if (nickname) {
            setNickname(nickname);
        } else {
            setDisablePressBackgroundClose(true);
            onPressChangeNickname();
        }
    };

    const onRefresh = () => {
        getNickname();
        setShowPopup(false);
    };

    const onPressChangeNickname = () => {
        setTitleIcon({ Icon: ['fas', 'signature'], IconSize: 30 });
        setPopupTitle(t('ChangeNickname'));
        setPopupContent(<ChangeNicknamePopup refreshName={onRefresh} />);
        setShowPopup(true);
    };

    return { nickname, getNickname, onPressChangeNickname };
};

export default useNickname;
