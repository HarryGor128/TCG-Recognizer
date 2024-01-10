import { ReactNode, createContext } from 'react';

export type AppPopupContextType = {
    isShowPopup: boolean; // Popup visible
    setShowPopup: Function; // Set popup visible
    popupContent: ReactNode; // Popup content
    setPopupContent: Function; // Set popup content
    onClosePopup: Function; // On close popup function
    setOnClosePopup: Function; // Set on close popup function
};

const defaultAppPopupContext: AppPopupContextType = {
    isShowPopup: false,
    setShowPopup: () => {},
    popupContent: null,
    setPopupContent: () => {},
    onClosePopup: () => {},
    setOnClosePopup: () => {},
};

const AppPopupContext = createContext(defaultAppPopupContext);

/**
 * @param isShowPopup: boolean; // Popup visible
 * @param setShowPopup: Function; // Set popup visible
 * @param popupContent: ReactNode; // Popup content
 * @param setPopupContent: Function; // Set popup content
 * @param onClosePopup: Function; // On close popup function
 * @param setOnClosePopup: Function; // Set on close popup function
 */
export default AppPopupContext;
