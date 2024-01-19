import { ReactNode, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';

const StartOptionScreen = () => {
    useAndroidBackButton();

    const {
        setPopupContainerStyles,
        setShowPopup,
        setPopupContent,
        setPopupTitle,
        setPopupTitleStyles,
    } = useContext(AppPopupContext);

    const onPressScanning = () => {
        const popup: ReactNode = (
            <View style={StartOptionScreenStyles.popupContent}>
                <CustomButton
                    OnPressCallback={() => {}}
                    ButtonText={'Scanning'}
                    Icon={['fas', 'expand']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
                <CustomButton
                    OnPressCallback={() => {}}
                    ButtonText={'AR View'}
                    Icon={['fas', 'vr-cardboard']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
            </View>
        );

        setShowPopup(true);
        setPopupContent(popup);
        setPopupTitle('Upload from');
        setPopupTitleStyles(StartOptionScreenStyles.titleText);
        setPopupContainerStyles(StartOptionScreenStyles.popupContainer);
    };

    const onPressAR = () => {};

    return (
        <View style={StartOptionScreenStyles.mainContainer}>
            <View style={StartOptionScreenStyles.logoContainer}>
                <Text>{'Logo'}</Text>
            </View>
            <View style={StartOptionScreenStyles.buttonContainer}>
                <CustomButton
                    OnPressCallback={onPressScanning}
                    ButtonText={'Scanning'}
                    Icon={['fas', 'expand']}
                    ContainerStyle={StartOptionScreenStyles.button}
                />
                <CustomButton
                    OnPressCallback={onPressAR}
                    ButtonText={'AR View'}
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

    popupContent: {
        flex: 1,
        justifyContent: 'center',
    },

    popupContainer: {
        height: 350,
    },

    titleText: {
        color: ColorConstant.Text.Black.Normal,
    },
});
