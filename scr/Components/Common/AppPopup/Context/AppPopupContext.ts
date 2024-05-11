import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AppIconProps } from './../../AppIcon/AppIconRenderer';

export type AppPopupContextType = {
    isShowPopup: boolean; // Popup visible
    setShowPopup: Dispatch<SetStateAction<boolean>>; // Set popup visible
    popupContent: ReactNode; // Popup content
    setPopupContent: Dispatch<SetStateAction<ReactNode>>; // Set popup content
    popupContainerStyles: StyleProp<ViewStyle>; // Popup container styles
    setPopupContainerStyles: Dispatch<SetStateAction<StyleProp<ViewStyle>>>; // Set popup container styles
    popupTitle?: string; // Popup title
    setPopupTitle: Dispatch<SetStateAction<string | undefined>>; // Set popup title
    popupTitleStyles?: StyleProp<TextStyle>; // Popup title styles
    setPopupTitleStyles: Dispatch<
        SetStateAction<StyleProp<TextStyle> | undefined>
    >; // Set Popup title styles
    titleIcon?: AppIconProps; // Title icon
    setTitleIcon: Dispatch<SetStateAction<AppIconProps | undefined>>; // Set title icon
    onPressAndroidBack?: Function; // When user press android back button
    setOnPressAndroidBack: Dispatch<SetStateAction<Function> | undefined>; // Set when user press android back button
    disablePressBackgroundClose: boolean;
    setDisablePressBackgroundClose: Dispatch<SetStateAction<boolean>>;
};

const defaultAppPopupContext: AppPopupContextType = {
    isShowPopup: false,
    setShowPopup: () => {},
    popupContent: null,
    setPopupContent: () => {},
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
    disablePressBackgroundClose: false,
    setDisablePressBackgroundClose: () => {},
};

const AppPopupContext = createContext(defaultAppPopupContext);

/**
 * @param isShowPopup: boolean; // Popup visible
 * @param setShowPopup: Function; // Set popup visible
 * @param popupContent: ReactNode; // Popup content
 * @param setPopupContent: Function; // Set popup content
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
