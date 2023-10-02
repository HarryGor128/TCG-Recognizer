import { useEffect } from 'react';
import { View } from 'react-native';

import mediaService from '../../Services/Common/mediaService';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const ScanningScreen = () => {
    const dispatch = useAppDispatch();

    const takePhoto = async () => {
        const result = await mediaService.TakePhoto(false);
    };

    useEffect(() => {
        dispatch(openLoader());
        takePhoto();
        dispatch(closeLoader());
    }, []);

    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
};

export default ScanningScreen;
