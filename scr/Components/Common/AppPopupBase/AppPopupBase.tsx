import { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';

interface AppPopupBaseProps {
    children: ReactNode; // React native component
    onPressBackground: Function; // On press background
    isShowPopup: boolean; // Is the popup show
}

/**
 *
 * @param children: ReactNode; // React native component
 * @param onPressBackground: Function; // On press background
 * @param isShowPopup: boolean; // Is the popup show
 */
const AppPopupBase = ({
    children,
    onPressBackground,
    isShowPopup,
}: AppPopupBaseProps) => {
    return (
        <Modal transparent animationType={'fade'} visible={isShowPopup}>
            <Pressable
                onPress={() => {
                    onPressBackground();
                }}
                style={AppPopupBaseStyles.BG}
            >
                {children}
            </Pressable>
        </Modal>
    );
};

export default AppPopupBase;

const AppPopupBaseStyles = StyleSheet.create({
    BG: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: ColorConstant.Transparent.Black,
    },
});
