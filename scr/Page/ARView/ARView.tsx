import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    Viro3DObject,
    ViroARImageMarker,
    ViroARScene,
    ViroARSceneNavigator,
    ViroARTrackingTargets,
    ViroNode,
} from '@viro-community/react-viro';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import useNickname from '../../Hook/useNickname';
import { PermissionService } from '../../Services/Common/PermissionService';
import commonService from '../../Services/Common/commonService';
import firebaseService from '../../Services/Common/firebaseService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ARView'>;

const ARScene = () => {
    const [yAxis, setYAxis] = useState<number>(0);
    const [targetCardList, setTargetCardList] = useState<string[]>([]);

    const { nickname, getNickname } = useNickname();

    useEffect(() => {
        const incrementYAxis = async () => {
            await commonService.sleep(100);
            setYAxis((prev) => {
                return prev < 360 ? prev + 1 : 0;
            });
        };

        incrementYAxis();
    }, [yAxis]);

    useEffect(() => {
        const addToFirebase = async () => {
            await firebaseService.addDocByID('AR', nickname, {
                cardList: targetCardList,
            });
        };

        getNickname();
        if (nickname && targetCardList.length > 0) {
            addToFirebase();
        }
    }, [targetCardList, nickname]);

    const addCard = (target: string) => {
        console.log('🚀 ~ file: ARView.tsx:41 ~ addCard ~ target:', target);
        setTargetCardList((prevList) => {
            const newList: string[] = JSON.parse(JSON.stringify(prevList));
            const findCard = newList.find((item) => item === target);

            if (!findCard) {
                newList.push(target);
            }

            return newList;
        });
    };

    return (
        <ViroARScene style={{ flex: 1 }}>
            <ViroARImageMarker
                target={'QCDB_JP009'}
                onHover={(isHovering) => {
                    if (isHovering) {
                        addCard('89631146');
                    }
                }}
            >
                <ViroNode
                    scale={[0.005, 0.005, 0.005]}
                    rotation={[0, -90, 0]}
                    dragType={'FixedToWorld'}
                >
                    <Viro3DObject
                        source={require('../../Assets/AR/3DModel/QCDB-JP009.obj')}
                        type={'OBJ'}
                        rotation={[0, yAxis, 0]}
                    />
                </ViroNode>
            </ViroARImageMarker>
            <ViroARImageMarker
                target={'DE03JP015'}
                onHover={(isHovering) => {
                    if (isHovering) {
                        addCard('44508094');
                    }
                }}
            >
                <ViroNode
                    scale={[0.003, 0.003, 0.003]}
                    rotation={[0, -90, 0]}
                    dragType={'FixedToWorld'}
                >
                    <Viro3DObject
                        source={require('../../Assets/AR/3DModel/DE03JP015.obj')}
                        type={'OBJ'}
                        rotationPivot={[0, 0, 30]}
                        position={[0, 20, -30]}
                        rotation={[0, yAxis, 0]}
                    />
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
    );
};

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

    const dispatch = useAppDispatch();

    const { nickname, getNickname, onPressChangeNickname } = useNickname();

    const { t } = useTranslation();

    const cleanData = async () => {
        getNickname();
        await firebaseService.deleteDoc('AR', nickname);
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

    return (
        <View style={ARViewStyles.mainContainer}>
            <AppHeader
                Title={t('ARScene')}
                LeftStack={
                    <AppHeaderBackButton
                        navigation={navigation}
                        beforeGoBack={() => cleanData()}
                    />
                }
                RightStack={
                    <CustomButton
                        OnPressCallback={onPressChangeNickname}
                        Icon={['fas', 'signature']}
                        IconSize={30}
                        IconColor={ColorConstant.Text.White.Normal}
                        ButtonContainerStyle={{
                            padding: 0,
                            backgroundColor: ColorConstant.Transparent.Clear,
                        }}
                    />
                }
            />
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: ARScene,
                }}
            />
        </View>
    );
};

export default ARViewScreen;

const ARViewStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },
});
