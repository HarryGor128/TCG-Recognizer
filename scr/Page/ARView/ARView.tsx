import { StyleSheet, View } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

import AppHeader from '../../Components/Common/AppHeader/AppHeaderRenderer';
import AppHeaderBackButton from '../../Components/Common/AppHeaderBackButton/AppHeaderBackButton';
import ColorConstant from '../../Constant/ColorConstant';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';

type ARViewScreenProps = {
    navigation: NavigationProp<ScreenParamList>;
};

const ARViewScreen = ({ navigation }: ARViewScreenProps) => {
    return (
        <View style={ARViewStyles.mainContainer}>
            <AppHeader
                LeftStack={<AppHeaderBackButton navigation={navigation} />}
                Title={'AR View'}
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
