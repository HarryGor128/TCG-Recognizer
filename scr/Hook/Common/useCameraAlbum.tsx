import { ReactNode, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'react-native-image-picker';

import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import ColorConstant from '../../Constant/ColorConstant';
import mediaService from '../../Services/Common/mediaService';

const useCameraAlbum = () => {
    const [photo, setPhoto] = useState<Asset>();

    const {
        setPopupContainerStyles,
        setShowPopup,
        setPopupContent,
        setPopupTitle,
        setPopupTitleStyles,
    } = useContext(AppPopupContext);

    const onPressAlbum = async () => {
        const result = await mediaService.SelectPhoto();
        if (result) {
            setPhoto(result);
        }
    };

    const onPressCamera = async () => {
        const result = await mediaService.TakePhoto();
        if (result) {
            setPhoto(result);
        }
    };

    const popup: ReactNode = (
        <View style={UseCameraAlbumStyles.popupContent}>
            <CustomButton
                OnPressCallback={onPressAlbum}
                ButtonText={'Album'}
                Icon={['fas', 'file-image']}
                ContainerStyle={UseCameraAlbumStyles.button}
            />
            <CustomButton
                OnPressCallback={onPressCamera}
                ButtonText={'Camera'}
                Icon={['fas', 'camera']}
                ContainerStyle={UseCameraAlbumStyles.button}
            />
        </View>
    );

    const openUploadPopup = () => {
        setShowPopup(true);
        setPopupContent(popup);
        setPopupTitle('Upload from');
        setPopupTitleStyles(UseCameraAlbumStyles.titleText);
        setPopupContainerStyles(UseCameraAlbumStyles.popupContainer);
    };

    return { openUploadPopup, photo };
};

export default useCameraAlbum;

const UseCameraAlbumStyles = StyleSheet.create({
    popupContent: {
        flex: 1,
        justifyContent: 'center',
    },

    popupContainer: {
        height: 350,
    },

    button: {
        marginVertical: 20,
    },

    titleText: {
        color: ColorConstant.Text.Black.Normal,
    },
});
