import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import MarketService from '../../Services/MarketService';
import BigWebResult from '../../Type/Market/BigWeb/BigWebResult';
import YuyuteiResult from '../../Type/Market/Yuyutei/YuyuteiResult';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'MarketResult'>;

const MarketResult = ({
    navigation,
    route: {
        params: { SearchString },
    },
}: NavigationProps) => {
    const [yytList, setYytList] = useState<YuyuteiResult[]>(
        [] as YuyuteiResult[],
    );
    const [bigWebList, setBigWebList] = useState<BigWebResult[]>(
        [] as BigWebResult[],
    );

    const getData = async () => {
        const yytResult = await MarketService.YuyuteiSearch(SearchString);
        setYytList(yytResult);

        const bigWebResult = await MarketService.BigWebSearch(SearchString);
        setBigWebList(bigWebResult);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={'Price'}
            />
            <View style={MarketResultStyles.mainContainer}>
                {/* <SectionList  /> */}
            </View>
        </>
    );
};

export default MarketResult;

const MarketResultStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    sectionContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
