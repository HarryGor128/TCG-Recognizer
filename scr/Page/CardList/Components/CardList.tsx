import { FlatList, TouchableOpacity } from 'react-native';

import YGOCardList from '../../../Type/CardList/YGOCardList';

interface CardListProps {
    cardList: YGOCardList[];
    onPressCard: Function;
}

const CardList = ({ cardList, onPressCard }: CardListProps) => {
    const renderObj = ({ item }: { item: YGOCardList }) => {
        const onPress = () => {
            onPressCard(item);
        };

        return <TouchableOpacity onPress={onPress}></TouchableOpacity>;
    };

    return (
        <FlatList
            data={cardList}
            renderItem={renderObj}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default CardList;
