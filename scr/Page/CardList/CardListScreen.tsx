import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CardList from './Components/CardList';
import SearchHistory from './Components/SearchHistory';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import SearchBar from '../../Components/Common/SearchBar/SearchBar';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useAsyncStorage from '../../Hook/Common/useAsyncStorage/useAsyncStorage';
import CardListService from '../../Services/CardListService';
import YGOCardList from '../../Type/CardList/YGOCardList';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'CardList'>;

const CardListScreen = ({ navigation }: NavigationProps) => {
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [cardList, setCardList] = useState<YGOCardList[]>([]);

    const { getData, setData } = useAsyncStorage();

    const dispatch = useAppDispatch();

    useAndroidBackButton(() => {
        navigation.goBack();
    });

    const { t } = useTranslation();

    const searching = async () => {
        dispatch(openLoader());
        if (searchText) {
            // Store search history
            const getHistory = await getData('SearchHistory');

            if (getHistory) {
                const historyList: string[] = JSON.parse(getHistory);
                if (!historyList.includes(searchText)) {
                    historyList.push(searchText);
                    setData('SearchHistory', JSON.stringify(historyList));
                }
            } else {
                setData('SearchHistory', JSON.stringify([searchText]));
            }

            // Get data in api
            const result = await CardListService.searchCardInfoByName(
                searchText,
            );

            setCardList(result);
        }
        dispatch(closeLoader());
    };

    useEffect(() => {
        if (searchText && !showHistory) {
            searching();
        }
    }, [searchText, showHistory]);

    const onSearchPress = async () => {
        setShowHistory(false);
    };

    const onPressSearchHistory = (text: string) => {
        setSearchText(text);
        setShowHistory(false);
    };

    const onFocus = () => {
        if (!showHistory) {
            setSearchText('');
        }
        setShowHistory(true);
    };

    const onPressCard = (cardName: string) => {
        navigation.navigate('MarketResult', { SearchString: cardName });
    };

    return (
        <>
            {!showHistory && (
                <AppHeader
                    LeftStack={<AppHeaderBackButton navigation={navigation} />}
                    Title={t('CardSearch')}
                />
            )}
            <View style={CardListStyles.mainContainer}>
                <SearchBar
                    onInput={setSearchText}
                    value={searchText}
                    containerStyle={CardListStyles.searchBar}
                    onSearchPress={onSearchPress}
                    onFocus={onFocus}
                />
                {showHistory ? (
                    <SearchHistory
                        searchText={searchText}
                        onPressSearchHistory={onPressSearchHistory}
                    />
                ) : (
                    <CardList cardList={cardList} onPressCard={onPressCard} />
                )}
            </View>
        </>
    );
};

export default CardListScreen;

const CardListStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },

    searchBar: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});
