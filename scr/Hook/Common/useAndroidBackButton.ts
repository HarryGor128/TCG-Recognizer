import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useAndroidBackButton = (
    onPressBack: Function | undefined = undefined,
) => {
    const onBackPress = () => {
        if (onPressBack) {
            onPressBack();
            return false;
        }

        return true;
    };

    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );

        return () => subscription.remove();
    }, []);
};

export default useAndroidBackButton;
