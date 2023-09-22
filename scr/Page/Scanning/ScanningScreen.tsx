import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const ScanningScreen = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(openLoader());
    }, []);

    return <TouchableOpacity style={{ flex: 1, backgroundColor: 'white' }} />;
};

export default ScanningScreen;
