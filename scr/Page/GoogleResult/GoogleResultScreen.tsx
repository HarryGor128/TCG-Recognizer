import { Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route }: NavigationProps) => {
    const { ScanningResult } = route.params;
    console.log(
        '🚀 ~ file: GoogleResultScreen.tsx:11 ~ GoogleResultScreen ~ ScanningResult:',
        ScanningResult,
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>{ScanningResult}</Text>
        </View>
    );
};

export default GoogleResultScreen;
