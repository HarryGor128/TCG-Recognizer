import AsyncStorage from '@react-native-async-storage/async-storage';

import asyncStorageKey from './asyncStorageKey';

const useAsyncStorage = () => {
    const setData = async (key: asyncStorageKey, data: string) => {
        try {
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            console.log('🚀 ~ setData ~ error:', error);
        }
    };

    const getData = async (key: asyncStorageKey) => {
        try {
            await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('🚀 ~ getData ~ error:', error);
        }
    };

    const removeData = async (key: asyncStorageKey) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('🚀 ~ removeData ~ error:', error);
        }
    };

    return { getData, setData, removeData };
};

export default useAsyncStorage;
