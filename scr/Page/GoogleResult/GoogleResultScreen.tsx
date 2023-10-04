import { Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route, navigation }: NavigationProps) => {
    const { ScanningResult } = route.params;
    console.log(
        '🚀 ~ file: GoogleResultScreen.tsx:11 ~ GoogleResultScreen ~ ScanningResult:',
        ScanningResult,
    );

    useAndroidBackButton(() => {
        navigation.goBack();
    });

    return <></>;
};

export default GoogleResultScreen;
