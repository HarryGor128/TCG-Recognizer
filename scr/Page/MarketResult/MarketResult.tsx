import { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    ScrollView,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import TextComponent from '../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../Constant/ColorConstant';
import commonService from '../../Services/Common/commonService';
import MarketService from '../../Services/MarketService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import MarketResultItem from '../../Type/UI/MarketResultItem';
import MarketResultList from '../../Type/UI/MarketResultList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'MarketResult'>;

const MarketResult = ({
    navigation,
    route: {
        params: { SearchString },
    },
}: NavigationProps) => {
    const dispatch = useAppDispatch();

    const [yytList, setYytList] = useState<MarketResultList[]>(
        [] as MarketResultList[],
    );
    const [bigWebList, setBigWebList] = useState<MarketResultList[]>(
        [] as MarketResultList[],
    );
    const [exchangeRate, setExchangeRate] = useState<number>(0);

    const getBigWebData = async () => {
        const bigWebResult = await MarketService.BigWebSearch(SearchString);

        const data: MarketResultList[] = [];

        bigWebResult.forEach((item) => {
            const findIndex = data.findIndex(
                (row) => item.rarity.slip === row.title,
            );

            let listData = new MarketResultItem();
            listData.cardName = item.name;
            listData.image = item.image;
            listData.price = item.price;
            listData.cur = 'JPY';
            listData.webUrl = `https://www.bigweb.co.jp/ja/products/yugioh/cardViewer/${item.id}`;

            // new header
            if (findIndex < 0) {
                let newList = new MarketResultList();
                newList.title = item.rarity.slip;

                newList.data.push(listData);
                data.push(newList);
            } else {
                // header exist
                data[findIndex].data.push(listData);
            }
        });

        setBigWebList(data);
    };

    const getYYTData = async () => {
        const yytResult = await MarketService.YuyuteiSearch(SearchString);

        const data: MarketResultList[] = [];

        yytResult.forEach((item) => {
            const dataRow: MarketResultList = new MarketResultList();
            dataRow.title = item.Rare;

            item.CardList.forEach((listRow) => {
                let dataItem: MarketResultItem = new MarketResultItem();
                dataItem.cardName = listRow.cardName;
                dataItem.image = listRow.cardImage;
                dataItem.price = listRow.price;
                dataItem.cur = 'JPY';
                dataItem.webUrl = listRow.url;

                dataRow.data.push(dataItem);
            });

            data.push(dataRow);
        });

        setYytList(data);
    };

    const getExchangeRate = async () => {
        const result = await MarketService.getCurrencyExchangeRate('jpy');
        console.log(
            '🚀 ~ file: MarketResult.tsx:105 ~ getExchangeRate ~ result:',
            result,
        );
        setExchangeRate(result);
    };

    const getData = async () => {
        dispatch(openLoader());
        await Promise.all([getYYTData(), getBigWebData(), getExchangeRate()]);
        dispatch(closeLoader());
    };

    const calExchange = (price: number): number => {
        return price * exchangeRate;
    };

    useEffect(() => {
        getData();
    }, []);

    const sectionHeader = (title: string) => {
        return (
            <View style={MarketResultStyles.sectionHeader}>
                <TextComponent>{title}</TextComponent>
            </View>
        );
    };

    const itemRenderer = (item: MarketResultItem) => {
        const onPress = () => {
            if (item.webUrl.length > 0) {
                Linking.openURL(item.webUrl);
            }
        };

        return (
            <TouchableOpacity
                onPress={onPress}
                style={MarketResultStyles.sectionItem}
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode={'contain'}
                    style={MarketResultStyles.itemImg}
                />
                <View style={MarketResultStyles.detail}>
                    <TextComponent>{item.cardName}</TextComponent>
                    <TextComponent>
                        {commonService.formatCurrency(item.price, 2, item.cur)}
                    </TextComponent>
                    <TextComponent>{`≈ ${commonService.formatCurrency(
                        calExchange(item.price),
                        2,
                        'HKD',
                    )}`}</TextComponent>
                </View>
            </TouchableOpacity>
        );
    };

    const marketRenderer = (logo: any) => {
        return (
            <View style={MarketResultStyles.marketLogo}>
                <Image source={logo} resizeMode={'contain'} />
            </View>
        );
    };

    return (
        <>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={SearchString}
            />
            <ScrollView style={MarketResultStyles.mainContainer}>
                {marketRenderer(require('../Assets/Market/YYTLogo.png'))}
                <SectionList
                    sections={yytList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => itemRenderer(item)}
                    renderSectionHeader={({ section: { title } }) =>
                        sectionHeader(title)
                    }
                />
                {marketRenderer(require('../Assets/Market/BigWebLogo.png'))}
                <SectionList
                    sections={bigWebList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => itemRenderer(item)}
                    renderSectionHeader={({ section: { title } }) =>
                        sectionHeader(title)
                    }
                />
            </ScrollView>
        </>
    );
};

export default MarketResult;

const MarketResultStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    marketLogo: {
        width: '50%',
        padding: 10,
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    sectionContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: ColorConstant.BG.Blue.Bright,
    },

    sectionItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.Grey.Light,
    },

    itemImg: {
        height: 100,
        width: 100,
        backgroundColor: ColorConstant.BG.Grey.Dark,
    },

    detail: {
        marginLeft: 10,
    },
});
