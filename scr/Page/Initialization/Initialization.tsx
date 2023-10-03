import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
        navigation.navigate('Scanning');
    }, []);

    return <></>;
};

export default InitializationScreen;
