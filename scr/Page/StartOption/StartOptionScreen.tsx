import { StyleSheet, Text, View } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useCameraAlbum from '../../Hook/Common/useCameraAlbum';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type StartOptionScreenProps = {
    navigation: NavigationProp<ScreenParamList>;
};

const StartOptionScreen = ({ navigation }: StartOptionScreenProps) => {
    useAndroidBackButton();

    const { openUploadPopup } = useCameraAlbum();

    const onPressScanning = () => {
        openUploadPopup();
    };

    const onPressAR = () => {
        navigation.navigate('ARView');
    };

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
});
