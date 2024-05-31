import { ReactNode, useEffect, useState } from 'react';
import {
    Keyboard,
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import { useAppSelector } from '../../../store/storeHooks';
import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';
import AppPopupBase from '../AppPopupBase/AppPopupBase';
import TextComponent from '../TextComponent/TextComponent';
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
 * @param popupTitle?: string; // Popup title
 * @param setPopupTitle: Function; // Set popup title
 * @param popupTitleStyles?: StyleProp<TextStyle>; // Popup title styles
 * @param setPopupTitleStyles: Function; // Set Popup title styles
 * @param titleIcon?: AppIconProps; // Title icon
 * @param setTitleIcon: Function; // Set title icon
 * @param onPressAndroidBack?: Function; // When user press android back button
 * @param setOnPressAndroidBack: Function; // Set when user press android back button
 */
const AppPopup = ({ children }: Props) => {
    const { isKeyboardShow } = useAppSelector((state) => state.appState);

    const [isShowPopup, setShowPopup] = useState<boolean>(false);
    const [popupContent, setPopupContent] = useState<ReactNode>(<></>);
    const [popupContainerStyles, setPopupContainerStyles] = useState<
        StyleProp<ViewStyle>
    >({});
    const [popupTitle, setPopupTitle] = useState<string | undefined>();
    const [popupTitleStyles, setPopupTitleStyles] = useState<
        StyleProp<TextStyle> | undefined
    >();
    const [titleIcon, setTitleIcon] = useState<AppIconProps | undefined>();
    const [onPressAndroidBack, setOnPressAndroidBack] = useState<
        Function | undefined
    >(undefined);
    const [disablePressBackgroundClose, setDisablePressBackgroundClose] =
        useState<boolean>(false);

    const value: AppPopupContextType = {
        isShowPopup,
        setShowPopup,
        popupContent,
        setPopupContent,
        popupContainerStyles,
        setPopupContainerStyles,
        popupTitle,
        setPopupTitle,
        popupTitleStyles,
        setPopupTitleStyles,
        titleIcon,
        setTitleIcon,
        onPressAndroidBack,
        setOnPressAndroidBack,
        disablePressBackgroundClose,
        setDisablePressBackgroundClose,
    };

    const onPressBackground = () => {
        if (isKeyboardShow) {
            Keyboard.dismiss();
        } else {
            if (!disablePressBackgroundClose) {
                setShowPopup(false);
            }
        }
    };

    // Clean props when popup close
    useEffect(() => {
        if (!isShowPopup) {
            setPopupContent(<></>);
            setPopupContainerStyles({});
            setPopupTitle(undefined);
            setPopupTitleStyles(undefined);
            setTitleIcon(undefined);
            setOnPressAndroidBack(undefined);
            setDisablePressBackgroundClose(false);
        }
    }, [isShowPopup]);

    return (
        <AppPopupContext.Provider value={value}>
            <AppPopupBase
                onPressBackground={onPressBackground}
                isShowPopup={isShowPopup}
            >
                <View
                    style={[
                        AppPopupStyles.container,
                        popupContainerStyles && { flex: undefined },
                        popupContainerStyles,
                    ]}
                    onStartShouldSetResponder={() => {
                        return true;
                    }}
                >
                    {popupTitle && (
                        <View style={AppPopupStyles.titleContainer}>
                            {titleIcon && <AppIcon {...titleIcon} />}
                            <TextComponent
                                style={[AppPopupStyles.title, popupTitleStyles]}
                            >
                                {popupTitle}
                            </TextComponent>
                        </View>
                    )}
                    {popupContent}
                </View>
            </AppPopupBase>
            {children}
        </AppPopupContext.Provider>
    );
};

export default AppPopup;

const AppPopupStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        padding: 20,
        maxHeight: '90%',
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.White.Normal,
    },

    title: {
        marginLeft: 10,
        fontSize: FontSizeConstant.large,
        color: ColorConstant.Text.Blue.Deep,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});
