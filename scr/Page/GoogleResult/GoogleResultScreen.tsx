import { useEffect, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import GoogleVisionService from '../../Services/GoogleVisionService';
import GoogleVisionAIImageResult from '../../Type/GoogleVision/GoogleVisionAIImageResult';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route, navigation }: NavigationProps) => {
    const { ScanningResult } = route.params;

    const [imageResult, setImageResult] = useState<GoogleVisionAIImageResult>(
        new GoogleVisionAIImageResult(),
    );

    const dispatch = useAppDispatch();

    useAndroidBackButton(() => {
        navigation.goBack();
    });

    const googleSearch = async () => {
        dispatch(openLoader());
        const result = await GoogleVisionService.VisionImageSearch(
            ScanningResult,
        );
        setImageResult(result);
        dispatch(closeLoader());
    };

    useEffect(() => {
        googleSearch();
    }, []);

    return <></>;
};

export default GoogleResultScreen;
