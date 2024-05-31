import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

import CardListItem from '../../../Components/CardListItem/CardListItem';
import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../../Constant/ColorConstant';
import YGOCardList from '../../../Type/CardList/YGOCardList';

interface CardListProps {
    cardList: YGOCardList[];
    onPressCard: Function;
}

const CardList = ({ cardList, onPressCard }: CardListProps) => {
    const { t } = useTranslation();

    return (
        <>
            {cardList.length > 0 ? (
                <FlatList
                    data={cardList}
                    renderItem={({ item }) => (
                        <CardListItem
                            item={item}
                            onPress={() => {
                                onPressCard(item.jp_name);
                            }}
                        />
                    )}
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
    noResult: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: ColorConstant.Text.White.Normal,
    },
});
