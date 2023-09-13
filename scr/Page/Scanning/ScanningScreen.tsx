import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import useCustomLoader from '../../Components/CustomLoader/useCustomLoader';

const ScanningScreen = () => {
    const { setIsLoading } = useCustomLoader();

    useEffect(() => {
        setIsLoading(true);
    }, []);

    return <TouchableOpacity style={{ flex: 1, backgroundColor: 'white' }} />;
};

export default ScanningScreen;
