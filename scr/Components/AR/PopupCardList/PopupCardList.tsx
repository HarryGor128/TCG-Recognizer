import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SectionList, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import CardListService from '../../../Services/CardListService';
import firebaseService from '../../../Services/Common/firebaseService';
import OnlinePlayerList from '../../../Type/AR/OnlinePlayerList';
import YGOCardList from '../../../Type/CardList/YGOCardList';
import { closeLoader, openLoader } from '../../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import CardListItem from '../../CardListItem/CardListItem';
import AppPopupContext from '../../Common/AppPopup/Context/AppPopupContext';
import TextComponent from '../../Common/TextComponent/TextComponent';

interface PopupCardListProps {
    targetCardList: string[];
    nickname: string;
}

type Section = {
    title: string;
    data: YGOCardList[];
};

const PopupCardList = ({ targetCardList, nickname }: PopupCardListProps) => {
    const [totalATK, setTotalATK] = useState<number>(0);

    const [battleList, setOnlineList] = useState<Section[]>([]);

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { setShowPopup } = useContext(AppPopupContext);

    const onCardListEmpty = () => {
        Alert.alert(t('Error'), t('NeedToScanOneCard'));
        setShowPopup(false);
    };

    const loadData = async () => {
        const getCurrentATK = async () => {
            for await (const item of targetCardList) {
                const result = (
                    await CardListService.searchCardInfoByName(item)
                )[0];
                setTotalATK((prev) => prev + result.data.atk);
            }
        };

        const getOnlinePlayer = async () => {
            const onlineListResult: OnlinePlayerList[] = (
                (await firebaseService.getCollection('AR'))
                    .data as OnlinePlayerList[]
            ).filter((item) => item.id !== nickname);

            const onlineCardList: Section[] = [];

            for await (const row of onlineListResult) {
                const cardList: YGOCardList[] = [];

                for await (const item of row.cardList) {
                    const result = (
                        await CardListService.searchCardInfoByName(item)
                    )[0];

                    cardList.push(result);
                }

                if (cardList.length > 0) {
                    onlineCardList.push({ title: row.id, data: cardList });
                }
            }

            setOnlineList(onlineCardList);
        };

        dispatch(openLoader());
        if (targetCardList.length <= 0) {
            onCardListEmpty();
        } else {
            await getCurrentATK();
            await getOnlinePlayer();
        }
        dispatch(closeLoader());
    };

    useEffect(() => {
        loadData();
    }, []);

    const renderHeader = ({
        section: { title },
    }: {
        section: { title: string };
    }) => {
        return (
            <View
                style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: ColorConstant.BG.Blue.Dark,
                }}
            >
                <TextComponent
                    style={{ color: ColorConstant.Text.White.Normal }}
                >
                    {`${t('Opponent')}: ${title}`}
                </TextComponent>
            </View>
        );
    };

    const onPressCard = (card: YGOCardList) => {
        const opponentATK = card.data.atk;

        Alert.alert(
            t('Result'),
            opponentATK < totalATK
                ? t('YouWin')
                : opponentATK === totalATK
                ? t('Draw')
                : t('YouLose'),
        );
    };

    return (
        <>
            {targetCardList.length > 0 && (
                <>
                    <TextComponent style={{ marginBottom: 10 }}>{`${t(
                        'YourATK',
                    )}${totalATK}`}</TextComponent>
                    <SectionList
                        sections={battleList}
                        renderSectionHeader={renderHeader}
                        renderItem={({ item }) => (
                            <CardListItem
                                item={item}
                                onPress={() => {
                                    onPressCard(item);
                                }}
                            />
                        )}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </>
            )}
        </>
    );
};

export default PopupCardList;
