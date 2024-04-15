import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import YGOCardList from '../../../Type/CardList/YGOCardList';

interface CardListProps {
    cardList: YGOCardList[];
    onPressCard: Function;
}

const CardList = ({ cardList, onPressCard }: CardListProps) => {
    const { t } = useTranslation();

    const renderObj = ({ item }: { item: YGOCardList }) => {
        const onPress = () => {
            onPressCard(item.jp_name);
        };

        return (
            <TouchableOpacity
                style={CardListStyles.itemContainer}
                onPress={onPress}
            >
                <TextComponent style={CardListStyles.cardName}>
                    {item.jp_name}
                </TextComponent>
                <TextComponent> {item.jp_ruby}</TextComponent>
                <TextComponent> {item.text.desc}</TextComponent>
                <TextComponent> {item.text.types}</TextComponent>
            </TouchableOpacity>
        );
    };

    return (
        <>
            {cardList.length > 0 ? (
                <FlatList
                    data={cardList}
                    renderItem={renderObj}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <TextComponent style={CardListStyles.noResult}>
                    {t('NoResult')}
                </TextComponent>
            )}
        </>
    );
};

export default CardList;

const CardListStyles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: ColorConstant.BG.Blue.Normal,
    },

    cardName: {
        fontWeight: 'bold',
        fontSize: FontSizeConstant.xlarge,
    },

    noResult: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: ColorConstant.Text.White.Normal,
    },
});
