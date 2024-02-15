import { useEffect } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackNavigationProp<
    ScreenParamList,
    'Initialization'
>;

const InitializationScreen = () => {
    const navigation = useNavigation<NavigationProps>();

    useAndroidBackButton();

    useEffect(() => {
        navigation.navigate('StartOption');
    }, []);

    return <View style={{ backgroundColor: ColorConstant.BG.Blue.Deep }} />;
};

export default InitializationScreen;
