import { ReactNode, useState } from 'react';
import {
    Keyboard,
    Modal,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import { useAppSelector } from '../../../store/storeHooks';
import AppPopupContext, {
    AppPopupContextType,
} from './Context/AppPopupContext';

interface Props {
    children: ReactNode;
}

/**
 * @description Use AppPopupContext to pass params
 * @param isShowPopup: boolean; // Popup visible
 * @param setShowPopup: Function; // Set popup visible
 * @param popupContent: ReactNode; // Popup content
 * @param setPopupContent: Function; // Set popup content
 * @param onClosePopup: Function; // On close popup function
 * @param setOnClosePopup: Function; // Set on close popup function
 * @param popupContainerStyles: StyleProp<ViewStyle>; // Popup container styles
 * @param setPopupContainerStyles: Function; // Set popup container styles
 */
const AppPopup = ({ children }: Props) => {
    const { isKeyboardShow } = useAppSelector((state) => state.appState);

    const [isShowPopup, setShowPopup] = useState<boolean>(false);
    const [popupContent, setPopupContent] = useState<ReactNode>(<></>);
    const [onClosePopup, setOnClosePopup] = useState<Function>(() => {});
    const [popupContainerStyles, setPopupContainerStyles] = useState<
        StyleProp<ViewStyle>
    >({});

    const value: AppPopupContextType = {
        isShowPopup,
        setShowPopup,
        popupContent,
        setPopupContent,
        onClosePopup,
        setOnClosePopup,
        popupContainerStyles,
        setPopupContainerStyles,
    };

    const onPressBackground = () => {
        if (isKeyboardShow) {
            Keyboard.dismiss();
        } else {
            if (onClosePopup) {
                onClosePopup();
            }
            setShowPopup(false);
        }
    };

    return (
        <AppPopupContext.Provider value={value}>
            <Modal transparent animationType={'fade'} visible={isShowPopup}>
                <TouchableOpacity
                    onPress={onPressBackground}
                    style={AppPopupStyles.BG}
                >
                    <View
                        style={AppPopupStyles.container}
                        pointerEvents={'box-none'}
                        onStartShouldSetResponder={() => true}
                    >
                        {popupContent}
                    </View>
                </TouchableOpacity>
            </Modal>
            {children}
        </AppPopupContext.Provider>
    );
};

export default AppPopup;

const AppPopupStyles = StyleSheet.create({
    BG: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstant.Transparent.Black,
    },

    container: {
        flex: 1,
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.White.Normal,
    },
});
