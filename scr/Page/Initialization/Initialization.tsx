import { useEffect } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import firebaseAuthService from '../../Services/Common/firebaseAuthService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import {
    closeLoader,
    openLoader,
    userLogin,
    userLogout,
} from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackNavigationProp<
    ScreenParamList,
    'Initialization'
>;

const InitializationScreen = () => {
    const navigation = useNavigation<NavigationProps>();

    const dispatch = useAppDispatch();

    useAndroidBackButton();

    const loginToFirebase = async () => {
        const result = await firebaseAuthService.anonymousLogin();
        dispatch(result.result ? userLogin() : userLogout());
    };

    useEffect(() => {
        dispatch(openLoader());
        loginToFirebase();
        dispatch(closeLoader());
        navigation.navigate('StartOption');
    }, []);

    return <View style={{ backgroundColor: ColorConstant.BG.Blue.Deep }} />;
};

export default InitializationScreen;
