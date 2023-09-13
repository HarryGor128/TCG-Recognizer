import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import useCustomLoader from '../../Components/CustomLoader/useCustomLoader';

type Props = NativeStackScreenProps<ScreenParamList, 'Initialization'>;

const InitializationScreen = ({ navigation }: Props) => {
    const { setIsLoading } = useCustomLoader();

    useEffect(() => {
        setIsLoading(true);
        navigation.navigate('Scanning');
        setIsLoading(false);
    }, []);

    return <></>;
};

export default InitializationScreen;
