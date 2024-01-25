import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useCameraAlbum from '../../Hook/Common/useCameraAlbum';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'StartOption'>;

const StartOptionScreen = ({ navigation }: NavigationProps) => {
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
