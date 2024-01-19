import { ReactNode, createContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type AppPopupContextType = {
    isShowPopup: boolean; // Popup visible
    setShowPopup: Function; // Set popup visible
    popupContent: ReactNode; // Popup content
    setPopupContent: Function; // Set popup content
    onClosePopup: Function; // On close popup function
    setOnClosePopup: Function; // Set on close popup function
    popupContainerStyles: StyleProp<ViewStyle>; // Popup container styles
    setPopupContainerStyles: Function; // Set popup container styles
};

const defaultAppPopupContext: AppPopupContextType = {
    isShowPopup: false,
    setShowPopup: () => {},
    popupContent: null,
    setPopupContent: () => {},
    onClosePopup: () => {},
    setOnClosePopup: () => {},
    popupContainerStyles: {},
    setPopupContainerStyles: () => {},
};

const AppPopupContext = createContext(defaultAppPopupContext);

/**
 * @param isShowPopup: boolean; // Popup visible
 * @param setShowPopup: Function; // Set popup visible
 * @param popupContent: ReactNode; // Popup content
 * @param setPopupContent: Function; // Set popup content
 * @param onClosePopup: Function; // On close popup function
 * @param setOnClosePopup: Function; // Set on close popup function
 * @param popupContainerStyles: StyleProp<ViewStyle>; // Popup container styles
 * @param setPopupContainerStyles: Function; // Set popup container styles
 */
export default AppPopupContext;
