import { ReactNode, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';

const StartOptionScreen = () => {
    const { setShowPopup, setPopupContent } = useContext(AppPopupContext);

    const onPressScanning = () => {
        const popup: ReactNode = (
            <View style={StartOptionScreenStyles.popupContainer}>
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
                    Disabled
                />
            </View>
        );

        setShowPopup(true);
        setPopupContent(popup);
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

    popupContainer: {},
});
