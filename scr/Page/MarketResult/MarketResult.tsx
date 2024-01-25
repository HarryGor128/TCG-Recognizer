import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import MarketService from '../../Services/MarketService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'MarketResult'>;

const MarketResult = ({
    navigation,
    route: {
        params: { SearchString },
    },
}: NavigationProps) => {
    useEffect(() => {
        const yytResult = MarketService.YuyuteiSearch(SearchString);
    }, []);

    return (
        <>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={'Price'}
            />
            <View style={MarketResultStyles.mainContainer}></View>
        </>
    );
};

export default MarketResult;

const MarketResultStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },
});
