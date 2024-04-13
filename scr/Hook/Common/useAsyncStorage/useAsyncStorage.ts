import AsyncStorage from '@react-native-async-storage/async-storage';

import asyncStorageKey from './asyncStorageKey';

const useAsyncStorage = () => {
    const setData = async (key: asyncStorageKey, data: string) => {
        console.log('🚀 ~ setData ~ data:', data);
        try {
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            console.log(
                '🚀 ~ file: useAsyncStorage.ts:11 ~ setData ~ error:',
                error,
            );
        }
    };

    const getData = async (key: asyncStorageKey) => {
        try {
            const result = await AsyncStorage.getItem(key);
            console.log(
                '🚀 ~ file: useAsyncStorage.ts:18 ~ getData ~ result:',
                result,
            );
            return result;
        } catch (error) {
            console.log(
                '🚀 ~ file: useAsyncStorage.ts:24 ~ getData ~ error:',
                error,
            );
            return '';
        }
    };

    const removeData = async (key: asyncStorageKey) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(
                '🚀 ~ file: useAsyncStorage.ts:39 ~ removeData ~ error:',
                error,
            );
            console.log('🚀 ~ removeData ~ error:', error);
        }
    };

    return { getData, setData, removeData };
};

export default useAsyncStorage;
