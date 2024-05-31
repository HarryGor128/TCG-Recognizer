import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    ViroARSceneNavigator,
    ViroARTrackingTargets,
} from '@viro-community/react-viro';

import ARScene from '../../Components/AR/ARScene/ARScene';
import PopupCardListContext, {
    PopupCardListContextType,
} from '../../Components/AR/PopupCardList/Context/PopupCardListContext';
import PopupCardList from '../../Components/AR/PopupCardList/PopupCardList';
import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useNickname from '../../Hook/useNickname';
import { PermissionService } from '../../Services/Common/PermissionService';
import firebaseService from '../../Services/Common/firebaseService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ARView'>;

const ARViewScreen = ({ navigation }: NavigationProps) => {
    ViroARTrackingTargets.createTargets({
        QCDB_JP009: {
            source: require('../../Assets/AR/QCDB-JP009.jpg'),
            orientation: 'Up',
            physicalWidth: 0.059, // real world width in meters
        },
        DE03JP015: {
            source: require('../../Assets/AR/DE03JP015.jpg'),
            orientation: 'Up',
            physicalWidth: 0.059, // real world width in meters
        },
    });

    const [targetCardList, setTargetCardList] = useState<string[]>([]);

    const value: PopupCardListContextType = {
        targetCardList,
        setTargetCardList,
    };

    const dispatch = useAppDispatch();

    const { getNickname, onPressChangeNickname, setNickname, nickname } =
        useNickname();

    const { setShowPopup, setTitleIcon, setPopupTitle, setPopupContent } =
        useContext(AppPopupContext);

    const { t } = useTranslation();

    const cleanData = async () => {
        getNickname();

        const deleteNickname = async (nickname: string) => {
            await firebaseService.deleteDoc('AR', nickname);
        };

        setNickname((prevName) => {
            deleteNickname(prevName);
            return prevName;
        });
    };

    useAndroidBackButton(() => {
        cleanData();
        navigation.goBack();
    });

    const cameraPermission = async () => {
        const result = await PermissionService.CameraPermission();

        if (!result) {
            Alert.alert(t('Error'), t('NeedCameraPermission'));
            navigation.goBack();
        }
    };

    useEffect(() => {
        dispatch(openLoader());
        getNickname();
        cameraPermission();
        dispatch(closeLoader());
    }, []);

    const onPressCardList = () => {
        setTitleIcon({ Icon: ['fas', 'person-rifle'], IconSize: 30 });
        setPopupTitle(t('Battle'));
        setPopupContent(
            <PopupCardList
                targetCardList={targetCardList}
                nickname={nickname}
            />,
        );
        setShowPopup(true);
    };

    return (
        <PopupCardListContext.Provider value={value}>
            <View style={ARViewStyles.mainContainer}>
                <AppHeader
                    Title={t('Battle')}
                    LeftStack={
                        <AppHeaderBackButton
                            navigation={navigation}
                            beforeGoBack={() => cleanData()}
                        />
                    }
                    RightStack={
                        <>
                            <CustomButton
                                OnPressCallback={onPressChangeNickname}
                                Icon={['fas', 'signature']}
                                IconSize={30}
                                IconColor={ColorConstant.Text.White.Normal}
                                ButtonContainerStyle={{
                                    padding: 0,
                                    backgroundColor:
                                        ColorConstant.Transparent.Clear,
                                }}
                            />
                            <CustomButton
                                OnPressCallback={onPressCardList}
                                Icon={['fas', 'person-rifle']}
                                IconSize={30}
                                IconColor={ColorConstant.Text.White.Normal}
                                ButtonContainerStyle={{
                                    padding: 0,
                                    marginLeft: 10,
                                    backgroundColor:
                                        ColorConstant.Transparent.Clear,
                                }}
                            />
                        </>
                    }
                />
                <ViroARSceneNavigator
                    autofocus={true}
                    initialScene={{
                        scene: ARScene,
                    }}
                />
            </View>
        </PopupCardListContext.Provider>
    );
};

export default ARViewScreen;

const ARViewStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },
});
