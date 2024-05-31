import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import YGOCardList from '../../Type/CardList/YGOCardList';
import TextComponent from '../Common/TextComponent/TextComponent';

interface CardListItemProps {
    item: YGOCardList;
    onPress: Function;
}

const CardListItem = ({ item, onPress }: CardListItemProps) => {
    const { width } = useWindowDimensions();

    return (
        <TouchableOpacity
            style={CardListItemStyles.itemContainer}
            onPress={() => {
                onPress();
            }}
        >
            <Image
                source={{
                    uri: `https://cdn.233.momobako.com/ygopro/pics/${item.id}.jpg`,
                }}
                style={{
                    width: width * 0.3,
                    backgroundColor: ColorConstant.Transparent.Black,
                }}
                resizeMode={'contain'}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <TextComponent
                    ellipsizeMode={'tail'}
                    style={CardListItemStyles.cardName}
                >
                    {item.jp_name}
                </TextComponent>
                <TextComponent ellipsizeMode={'tail'}>
                    {item.jp_ruby}
                </TextComponent>
                <TextComponent ellipsizeMode={'tail'}>
                    {item.text.types}
                </TextComponent>
                <TextComponent numberOfLines={3} ellipsizeMode={'tail'}>
                    {item.text.desc}
                </TextComponent>
            </View>
        </TouchableOpacity>
    );
};

export default CardListItem;

const CardListItemStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
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
});
