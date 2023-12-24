import { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import GoogleVisionService from '../../Services/GoogleVisionService';
import GoogleVisionAIImageTextResult from '../../Type/GoogleVision/GoogleVisionAIImageTextResult';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route, navigation }: NavigationProps) => {
    const { ScanningResult } = route.params;

    const [imageResult, setImageResult] =
        useState<GoogleVisionAIImageTextResult>(
            new GoogleVisionAIImageTextResult(),
        );

    const [textList, setTextList] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    useAndroidBackButton(() => {
        navigation.goBack();
    });

    const googleSearch = async () => {
        dispatch(openLoader());

        const result = await GoogleVisionService.VisionImageTextSearch(
            ScanningResult,
        );
        setImageResult(result);

        const annotationText = result.responses[0].fullTextAnnotation.text;
        setTextList(annotationText.split('\n'));

        dispatch(closeLoader());
    };

    useEffect(() => {
        googleSearch();
    }, []);

    const resultRenderer = ({ item }: { item: string }) => {
        return (
            <TouchableOpacity
                style={GoogleResultScreenStyles.resultItem}
                onPress={() => {}}
            >
                <Text style={GoogleResultScreenStyles.resultItemText}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={GoogleResultScreenStyles.mainContainer}>
            <FlatList
                data={textList}
                renderItem={resultRenderer}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default GoogleResultScreen;

const GoogleResultScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },

    resultItem: {
        flex: 1,
        padding: 10,
        marginVertical: 10,
    },

    resultItemText: {
        color: 'black',
    },
});
