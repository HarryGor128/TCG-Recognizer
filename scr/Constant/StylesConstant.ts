import { StyleSheet } from 'react-native';
import ColorConstant from './ColorConstant';

const StylesConstant = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.White.Normal,
        paddingHorizontal: 20,
    },

    FlexContainer: {
        flex: 1,
    },

    BGFlexContainer: {
        flex: 1,
        backgroundColor: ColorConstant.BG.White.Normal,
    },

    CenterContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    ScrollViewContent: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    ModalMainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: ColorConstant.Transparent.Black,
    },
});

export default StylesConstant;
