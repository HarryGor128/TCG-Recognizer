import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const PermissionService = {
    // Add
    // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    // <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    // to AndroidManifest first
    async StoragePermission() {
        if (Platform.OS === 'android') {
            //Storage permission
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Read Storage Permission',
                        message: '',
                        //   buttonNeutral: "Ask Me Later",
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the read storage');
                } else {
                    console.log('Storage permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Write Storage Permission',
                        message: '',
                        //   buttonNeutral: "Ask Me Later",
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the write storage');
                } else {
                    console.log('Storage permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                console.log(
                    '🚀 ~ file: PermissionService.ts ~ line 78 ~ request ~ result',
                    result,
                );
            });
        }
    },

    // Add <uses-permission android:name="android.permission.CAMERA" /> to AndroidManifest first
    async CameraPermission(): Promise<boolean> {
        // if (Platform.OS === 'android') {
        //     //Camera permission
        //     try {
        //         const granted = await PermissionsAndroid.request(
        //             PermissionsAndroid.PERMISSIONS.CAMERA,
        //             // {
        //             //     title: 'Camera Permission',
        //             //     message: '',
        //             //     buttonPositive: 'OK',
        //             // },
        //         );
        //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             console.log('You can use the camera');
        //             return Promise.resolve(true);
        //         } else {
        //             console.log('Camera permission denied');
        //             return Promise.resolve(false);
        //         }
        //     } catch (err) {
        //         console.warn(err);
        //         return Promise.resolve(false);
        //     }
        // } else {
        //     const iosResult = await request(PERMISSIONS.IOS.CAMERA);

        //     return Promise.resolve(iosResult === RESULTS.GRANTED);
        // }
        const result = await request(
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.CAMERA
                : PERMISSIONS.IOS.CAMERA,
        );
        console.log(
            '🚀 ~ file: PermissionService.ts:103 ~ CameraPermission ~ result:',
            result,
        );

        return Promise.resolve(result === RESULTS.GRANTED);
    },

    // Add <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> to AndroidManifest first
    async GPSPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'GPS Permission',
                        message: '',
                        //   buttonNeutral: "Ask Me Later",
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the GPS');
                } else {
                    console.log('GPS permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    },

    // Add
    // <uses-permission android:name="android.permission.RECORD_AUDIO" />
    // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    // <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    // to AndroidManifest first
    async RecordAudioPermission() {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                        PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        } else {
            console.log('Add');
            console.log('<key>NSMicrophoneUsageDescription</key>');
            console.log(
                '<string>Give $(PRODUCT_NAME) permission to use your microphone. Your record wont be shared without your permission.</string>',
            );
            console.log('to Info.plist');
        }
    },
};
