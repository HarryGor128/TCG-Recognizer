import { Alert } from 'react-native';
import {
    Asset,
    PhotoQuality,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';

import { PermissionService } from './PermissionService';

const mediaService = {
    /**
     *
     * @param quality 0 to 1
     * @param saveToPhotos (Boolean) Only for launchCamera, saves the image/video file captured to public photo
     * @returns Asset {
     *  base64?: string;
     *  uri?: string;
     *  width?: number;
     *  height?: number;
     *  fileSize?: number;
     *  type?: string;
     *  fileName?: string;
     *  duration?: number;
     *  bitrate?: number;
     *  timestamp?: string;
     *  id?: string;
     * }
     */
    async TakePhoto(
        withBase64Header = true,
        quality: PhotoQuality = 1,
        saveToPhotos: boolean = false,
    ): Promise<Asset | undefined> {
        try {
            await PermissionService.CameraPermission();
            const result = await launchCamera({
                mediaType: 'photo',
                includeBase64: true,
                quality,
                saveToPhotos,
            });
            if (result.assets !== undefined) {
                if (withBase64Header) {
                    result.assets[0].base64 = `data:${result.assets[0].type};base64,${result.assets[0].base64}`;
                }
                console.log(
                    '🚀 ~ file: mediaService.ts:11 ~ TakePhoto ~ result:',
                    result.assets[0],
                );
            }
            return Promise.resolve(
                result.assets !== undefined ? result.assets[0] : ({} as Asset),
            );
        } catch (e: any) {
            console.log('🚀 ~ file: mediaService.ts:22 ~ TakePhoto ~ e:', e);
            Alert.alert('Error', e.toString());
            Promise.resolve({} as Asset);
        }
    },

    /**
     *
     * @param quality 0 to 1
     * @param selectionLimit 	Default is 1, use 0 to allow any number of files. Only iOS version >= 14 & Android version >= 13 support 0 and also it supports providing any integer value
     * @returns Asset {
     *  base64?: string;
     *  uri?: string;
     *  width?: number;
     *  height?: number;
     *  fileSize?: number;
     *  type?: string;
     *  fileName?: string;
     *  duration?: number;
     *  bitrate?: number;
     *  timestamp?: string;
     *  id?: string;
     * }
     */
    async SelectPhoto(
        withBase64Header = true,
        quality: PhotoQuality = 1,
        selectionLimit: number = 1,
    ): Promise<Asset | undefined> {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: true,
                quality,
                selectionLimit,
            });
            if (result.assets !== undefined) {
                if (withBase64Header) {
                    result.assets[0].base64 = `data:${result.assets[0].type};base64,${result.assets[0].base64}`;
                }
                console.log(
                    '🚀 ~ file: mediaService.ts:20 ~ SelectPhoto ~ result:',
                    result.assets[0],
                );
            }
            return Promise.resolve(
                result.assets !== undefined ? result.assets[0] : ({} as Asset),
            );
        } catch (e: any) {
            console.log('🚀 ~ file: mediaService.ts:46 ~ SelectPhoto ~ e:', e);
            Alert.alert('Error', e.toString());
            Promise.resolve({} as Asset);
        }
    },
};

export default mediaService;
