import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

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
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ARView'>;

const ARScene = () => {
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
                    />
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
    );
};

const ARViewScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

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
