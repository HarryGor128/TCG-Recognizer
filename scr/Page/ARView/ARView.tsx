import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import ColorConstant from '../../Constant/ColorConstant';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type NavigationProps = NativeStackScreenProps<ScreenParamList, 'ARView'>;

const ARViewScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    return (
        <View style={ARViewStyles.mainContainer}>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={t('ARScene')}
            />
        </View>
    );
};

export default ARViewScreen;

const ARViewStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.White.Normal,
    },
});
