import { useCallback } from 'react';
import { View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import mediaService from '../../Services/Common/mediaService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackNavigationProp<ScreenParamList, 'Scanning'>;

const ScanningScreen = () => {
    const navigation = useNavigation<NavigationProps>();

    const dispatch = useAppDispatch();

    useAndroidBackButton();

    const takePhoto = async () => {
        const result = await mediaService.TakePhoto(false, 1, false, () => {
            takePhoto();
        });

        if (result?.base64 !== '') {
            navigation.navigate('GoogleResult', {
                ScanningResult: result?.base64,
            });
        }
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(openLoader());
            takePhoto();
            dispatch(closeLoader());
        }, []),
    );

    return <View style={{ flex: 1, backgroundColor: 'black' }} />;
};

export default ScanningScreen;
