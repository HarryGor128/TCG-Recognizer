import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppIconProps } from '../../Components/Common/AppIcon/AppIconRenderer';
import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useCameraAlbum from '../../Hook/Common/useCameraAlbum';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'StartOption'>;

interface lang {
    lang: string;
    label: string;
}

const ChangeLangPopup = () => {
    const { t, i18n } = useTranslation();

    const { setShowPopup } = useContext(AppPopupContext);

    const langList: lang[] = [
        { lang: 'en', label: 'English' },
        { lang: 'chit', label: 'ChineseTraditional' },
    ];

    const itemRenderer = ({ item }: { item: lang }) => {
        const onPressLang = () => {
            i18n.changeLanguage(item.lang);
            setShowPopup(false);
        };

        return (
            <CustomButton
                OnPressCallback={onPressLang}
                ButtonText={t(item.label)}
                ContainerStyle={StartOptionScreenStyles.changeLangItem}
            />
        );
    };

    return (
        <FlatList
            data={langList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemRenderer}
        />
    );
};

const StartOptionScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    const { setShowPopup, setPopupContent, setPopupTitle, setTitleIcon } =
        useContext(AppPopupContext);

    const { openUploadPopup, photo, setPhoto } = useCameraAlbum();

    useAndroidBackButton();

    useEffect(() => {
        if (photo?.base64 !== undefined) {
            navigation.navigate('GoogleResult', {
                ScanningResult: photo.base64,
            });
            setPhoto({});
        }
    }, [photo]);

    const onPressScanning = () => {
        openUploadPopup();
    };

    const onPressAR = () => {
        navigation.navigate('ARView');
    };

    const onPressChangeLang = () => {
        const icon: AppIconProps = { Icon: ['fas', 'language'], IconSize: 30 };
        setTitleIcon(icon);
        setPopupTitle(t('Language'));
        setPopupContent(<ChangeLangPopup />);
        setShowPopup(true);
    };

    const opPressCardSearch = () => {
        navigation.navigate('CardList');
    };

    const onPressChatRoom = () => {
        navigation.navigate('ChatRoom');
    };

    return (
        <ScrollView style={StartOptionScreenStyles.mainContainer}>
            <View style={StartOptionScreenStyles.logoContainer}>
                <CustomButton
                    OnPressCallback={onPressChangeLang}
                    Icon={['fas', 'language']}
                    IconSize={30}
                    IconColor={ColorConstant.Text.Blue.Bright}
                    ButtonContainerStyle={
                        StartOptionScreenStyles.changeLangButton
                    }
                />
                <Image
                    source={require('../../Assets/Logo/Logo.png')}
                    style={StartOptionScreenStyles.logo}
                    resizeMode={'contain'}
                />
            </View>
            <View style={StartOptionScreenStyles.buttonContainer}>
                <CustomButton
                    OnPressCallback={onPressScanning}
                    ButtonText={t('Scanning')}
                    Icon={['fas', 'expand']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
                <CustomButton
                    OnPressCallback={onPressAR}
                    ButtonText={t('ARScene')}
                    Icon={['fas', 'vr-cardboard']}
                    ContainerStyle={StartOptionScreenStyles.button}
                    Disabled={Platform.OS === 'ios'}
                />
                <CustomButton
                    OnPressCallback={opPressCardSearch}
                    ButtonText={t('CardSearch')}
                    Icon={['fas', 'search']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
                <CustomButton
                    OnPressCallback={onPressChatRoom}
                    ButtonText={t('ChatRoom')}
                    Icon={['fas', 'message']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
            </View>
        </ScrollView>
    );
};

export default StartOptionScreen;

const StartOptionScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },

    logo: {
        height: 300,
        alignSelf: 'center',
    },

    buttonContainer: {
        flex: 1,
        padding: 20,
    },

    button: {
        marginVertical: 20,
    },

    logoContainer: {
        flex: 1,
    },

    changeLangItem: {
        marginVertical: 10,
    },

    changeLangButton: {
        padding: 0,
        margin: 20,
        alignSelf: 'flex-end',
        backgroundColor: ColorConstant.Transparent.Clear,
    },
});
