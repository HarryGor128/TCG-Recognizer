import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../../Constant/ColorConstant';
import useAsyncStorage from '../../../Hook/Common/useAsyncStorage/useAsyncStorage';
import { useAppSelector } from '../../../store/storeHooks';

interface SearchHistoryProps {
    searchText: string;
    onPressSearchHistory: Function;
}

const SearchHistory = ({
    searchText,
    onPressSearchHistory,
}: SearchHistoryProps) => {
    const { isKeyboardShow } = useAppSelector((state) => state.appState);

    const [historyList, setHistoryList] = useState<string[]>([]);

    const { getData } = useAsyncStorage();

    const refreshList = async () => {
        const getHistory = await getData('SearchHistory');

        if (getHistory) {
            const list = JSON.parse(getHistory);
            setHistoryList(list);
        }
    };

    useEffect(() => {
        refreshList();
    }, [isKeyboardShow]);

    const onPressItem = (item: string) => {
        onPressSearchHistory(item);
    };

    const renderItem = ({ item }: { item: string }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onPressItem(item);
                }}
                style={SearchHistoryStyles.item}
            >
                <TextComponent>{item}</TextComponent>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={historyList.filter((item) => item.includes(searchText))}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default SearchHistory;

const SearchHistoryStyles = StyleSheet.create({
    item: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.White.Normal,
    },
});
