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
import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import { PermissionService } from '../../Services/Common/PermissionService';
import commonService from '../../Services/Common/commonService';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ARView'>;

const ARScene = () => {
    const [yAxis, setYAxis] = useState<number>(0);

    useEffect(() => {
        const incrementYAxis = async () => {
            await commonService.sleep(100);
            setYAxis((prev) => {
                return prev < 360 ? prev + 1 : 0;
            });
        };

        incrementYAxis();
    }, [yAxis]);

    return (
        <ViroARScene style={{ flex: 1 }}>
            <ViroARImageMarker target={'QCDB_JP009'}>
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
        </ViroARScene>
    );
};

const ARViewScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    useAndroidBackButton(() => {
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
        cameraPermission();
    }, []);

    return (
        <View style={ARViewStyles.mainContainer}>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={t('ARScene')}
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

ViroARTrackingTargets.createTargets({
    QCDB_JP009: {
        source: require('../../Assets/AR/QCDB-JP009.jpg'),
        orientation: 'Up',
        physicalWidth: 0.059, // real world width in meters
    },
});

export default ARViewScreen;

const ARViewStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.Blue.Deep,
    },
});
