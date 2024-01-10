import { ReactNode, useState } from 'react';
import { Keyboard, Modal, TouchableOpacity, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import { useAppSelector } from '../../../store/storeHooks';
import AppPopupContext, {
    AppPopupContextType,
} from './Context/AppPopupContext';

/**
 * @description Use AppPopupContext to pass params
 * @param isShowPopup: boolean; // Popup visible
 * @param setShowPopup: Function; // Set popup visible
 * @param popupContent: ReactNode; // Popup content
 * @param setPopupContent: Function; // Set popup content
 * @param onClosePopup: Function; // On close popup function
 * @param setOnClosePopup: Function; // Set on close popup function
 */
const AppPopup = () => {
    const { isKeyboardShow } = useAppSelector((state) => state.appState);

    const [isShowPopup, setShowPopup] = useState<boolean>(false);
    const [popupContent, setPopupContent] = useState<ReactNode>(<></>);
    const [onClosePopup, setOnClosePopup] = useState<Function>(() => {});

    const value: AppPopupContextType = {
        isShowPopup,
        setShowPopup,
        popupContent,
        setPopupContent,
        onClosePopup,
        setOnClosePopup,
    };

    const onPressBackground = () => {
        if (isKeyboardShow) {
            Keyboard.dismiss();
        } else {
            onClosePopup();
            setShowPopup(false);
        }
    };

    return (
        <AppPopupContext.Provider value={value}>
            <Modal transparent animationType={'fade'} visible={isShowPopup}>
                <TouchableOpacity
                    onPress={onPressBackground}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: ColorConstant.Transparent.Black,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        pointerEvents={'box-none'}
                        onStartShouldSetResponder={() => true}
                    >
                        {popupContent}
                    </View>
                </TouchableOpacity>
            </Modal>
        </AppPopupContext.Provider>
    );
};

export default AppPopup;
