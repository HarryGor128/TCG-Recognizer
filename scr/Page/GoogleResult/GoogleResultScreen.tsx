import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import SearchBar from '../../Components/Common/SearchBar/SearchBar';
import TextComponent from '../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import GoogleVisionService from '../../Services/GoogleVisionService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'GoogleResult'>;

const GoogleResultScreen = ({ route, navigation }: NavigationProps) => {
    const { ScanningResult } = route.params;

    const [textList, setTextList] = useState<string[]>([]);

    const [searchText, setSearchText] = useState<string>('');

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

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

    const searchPrice = () => {
        if (searchText) {
            navigation.navigate('MarketResult', { SearchString: searchText });
        } else {
            Alert.alert(t('Error'), t('ErrorSearchPrice'));
        }
    };

    const resultRenderer = ({ item }: { item: string }) => {
        const onPressResult = () => {
            setSearchText(item);
        };

        return (
            <TouchableOpacity
                style={GoogleResultScreenStyles.resultItem}
                onPress={onPressResult}
            >
                <TextComponent style={GoogleResultScreenStyles.resultItemText}>
                    {item}
                </TextComponent>
            </TouchableOpacity>
        );
    };

    const onSearchBarInput = (text: string) => {
        setSearchText(text);
    };

    return (
        <>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={t('Result')}
            />
            <View style={GoogleResultScreenStyles.mainContainer}>
                <Image
                    source={{ uri: ScanningResult }}
                    style={GoogleResultScreenStyles.uploadImage}
                    resizeMode={'contain'}
                />
                <SearchBar
                    onInput={onSearchBarInput}
                    value={searchText}
                    containerStyle={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    isSearchButtonShow
                    onSearchPress={searchPrice}
                />
                {textList.length > 0 ? (
                    <FlatList
                        data={textList}
                        renderItem={resultRenderer}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <TextComponent style={GoogleResultScreenStyles.noResult}>
                        {t('NoResult')}
                    </TextComponent>
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
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
