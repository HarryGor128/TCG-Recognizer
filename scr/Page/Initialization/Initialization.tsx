import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackNavigationProp<ScreenParamList, 'Initialization'>;

const InitializationScreen = () => {
    const navigation = useNavigation<Props>();

    useEffect(() => {
        navigation.navigate('Scanning');
    }, []);

    return <></>;
};

export default InitializationScreen;
