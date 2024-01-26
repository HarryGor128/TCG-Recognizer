import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import GoogleVisionService from '../../Services/GoogleVisionService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route, navigation }: NavigationProps) => {
    const { ScanningResult } = route.params;

    const [textList, setTextList] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    useAndroidBackButton(() => {
        navigation.goBack();
    });

    const googleSearch = async () => {
        dispatch(openLoader());

        const result = await GoogleVisionService.VisionImageTextSearch(
            ScanningResult.split('base64,')[1],
        );

        if (result.responses[0].fullTextAnnotation) {
            const annotationText = result.responses[0].fullTextAnnotation.text;
            setTextList(annotationText.split('\n'));
        }

        dispatch(closeLoader());
    };

    useEffect(() => {
        googleSearch();
    }, []);

    const resultRenderer = ({ item }: { item: string }) => {
        const onPressResult = () => {
            navigation.navigate('MarketResult', { SearchString: item });
        };

        return (
            <TouchableOpacity
                style={GoogleResultScreenStyles.resultItem}
                onPress={onPressResult}
            >
                <Text style={GoogleResultScreenStyles.resultItemText}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={'Result'}
            />
            <View style={GoogleResultScreenStyles.mainContainer}>
                <Image
                    source={{ uri: ScanningResult }}
                    style={GoogleResultScreenStyles.uploadImage}
                    resizeMode={'contain'}
                />
                {textList.length > 0 ? (
                    <FlatList
                        data={textList}
                        renderItem={resultRenderer}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={GoogleResultScreenStyles.noResult}>
                        {'No result'}
                    </Text>
                )}
            </View>
        </>
    );
};

export default GoogleResultScreen;

const GoogleResultScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    uploadImage: {
        height: '30%',
        margin: 20,
    },

    resultItem: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: ColorConstant.BG.Blue.Bright,
    },

    resultItemText: {
        color: 'black',
    },

    noResult: {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Blue.Deep,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
