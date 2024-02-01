import { ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'react-native-image-picker';

import AppPopupContext from '../../Components/Common/AppPopup/Context/AppPopupContext';
import CustomButton from '../../Components/Common/CustomButton/CustomButton';
import mediaService from '../../Services/Common/mediaService';

const useCameraAlbum = () => {
    const { t } = useTranslation();

    const [photo, setPhoto] = useState<Asset>({});

    const {
        setPopupContainerStyles,
        setShowPopup,
        setPopupContent,
        setPopupTitle,
    } = useContext(AppPopupContext);

    const onPressAlbum = async () => {
        const result = await mediaService.SelectPhoto();
        if (result) {
            setPhoto(result);
            setShowPopup(false);
        }
    };

    const onPressCamera = async () => {
        const result = await mediaService.TakePhoto();
        if (result) {
            setPhoto(result);
            setShowPopup(false);
        }
    };

    const popup: ReactNode = (
        <View style={UseCameraAlbumStyles.popupContent}>
            <CustomButton
                OnPressCallback={onPressAlbum}
                ButtonText={t('Album')}
                Icon={['fas', 'file-image']}
                ContainerStyle={UseCameraAlbumStyles.button}
            />
            <CustomButton
                OnPressCallback={onPressCamera}
                ButtonText={t('Camera')}
                Icon={['fas', 'camera']}
                ContainerStyle={UseCameraAlbumStyles.button}
            />
        </View>
    );

    const openUploadPopup = () => {
        setShowPopup(true);
        setPopupContent(popup);
        setPopupTitle(t('UploadFrom'));
        setPopupContainerStyles(UseCameraAlbumStyles.popupContainer);
    };

    return { openUploadPopup, photo, setPhoto };
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
});
