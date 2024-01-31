import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import TextComponent from '../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useCameraAlbum from '../../Hook/Common/useCameraAlbum';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'StartOption'>;

const ChangeLangPopup = () => {
    const langList: { lang: string; label: string }[] = [
        { lang: 'en', label: 'English' },
        { lang: 'chit', label: 'ChineseTraditional' },
    ];

    const itemRenderer = () => {
        return <></>;
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

    const { openUploadPopup, photo } = useCameraAlbum();

    useAndroidBackButton();

    useEffect(() => {
        if (photo?.base64 !== undefined) {
            navigation.navigate('GoogleResult', {
                ScanningResult: photo.base64,
            });
        }
    }, [photo]);

    const onPressScanning = () => {
        openUploadPopup();
    };

    const onPressAR = () => {
        navigation.navigate('ARView');
    };

    const onPressChangeLang = () => {};

    return (
        <View style={StartOptionScreenStyles.mainContainer}>
            <CustomButton
                OnPressCallback={onPressChangeLang}
                Icon={['fas', 'language']}
                IconSize={30}
                ButtonContainerStyle={{
                    padding: 0,
                    backgroundColor: ColorConstant.Transparent.Clear,
                    alignSelf: 'flex-end',
                    margin: 20,
                }}
            />
            <View style={StartOptionScreenStyles.logoContainer}>
                <TextComponent>{'Logo'}</TextComponent>
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
                    Disabled
                />
            </View>
        </View>
    );
};

export default StartOptionScreen;

const StartOptionScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: ColorConstant.BG.White.Normal,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
