import { ReactNode, createContext } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AppIconProps } from './../../AppIcon/AppIconRenderer';

export type AppPopupContextType = {
    isShowPopup: boolean; // Popup visible
    setShowPopup: Function; // Set popup visible
    popupContent: ReactNode; // Popup content
    setPopupContent: Function; // Set popup content
    onClosePopup: Function; // On close popup function
    setOnClosePopup: Function; // Set on close popup function
    popupContainerStyles: StyleProp<ViewStyle>; // Popup container styles
    setPopupContainerStyles: Function; // Set popup container styles
    popupTitle?: string; // Popup title
    setPopupTitle: Function; // Set popup title
    popupTitleStyles?: StyleProp<TextStyle>; // Popup title styles
    setPopupTitleStyles: Function; // Set Popup title styles
    titleIcon?: AppIconProps; // Title icon
    setTitleIcon: Function; // Set title icon
    onPressAndroidBack?: Function; // When user press android back button
    setOnPressAndroidBack: Function; // Set when user press android back button
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
    popupTitle: undefined,
    setPopupTitle: () => {},
    popupTitleStyles: {},
    setPopupTitleStyles: () => {},
    titleIcon: undefined,
    setTitleIcon: () => {},
    onPressAndroidBack: undefined,
    setOnPressAndroidBack: () => {},
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
 * @param popupTitle?: string; // Popup title
 * @param setPopupTitle: Function; // Set popup title
 * @param popupTitleStyles?: StyleProp<TextStyle>; // Popup title styles
 * @param setPopupTitleStyles: Function; // Set Popup title styles
 * @param titleIcon?: AppIconProps; // Title icon
 * @param setTitleIcon: Function; // Set title icon
 * @param onPressAndroidBack?: Function; // When user press android back button
 * @param setOnPressAndroidBack: Function; // Set when user press android back button
 */
export default AppPopupContext;
