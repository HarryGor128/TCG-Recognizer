import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

const useNetworkError = () => {
    const { isConnected } = useNetInfo();

    const { t } = useTranslation();

    useEffect(() => {
        if (isConnected === false) {
            console.log('Network Disconnected');
            Alert.alert(t('NetworkError'));
        }
    }, [isConnected, t]);
};

export default useNetworkError;
