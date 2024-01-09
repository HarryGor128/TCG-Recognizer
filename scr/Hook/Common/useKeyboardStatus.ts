import { useEffect } from 'react';
import { Keyboard } from 'react-native';

import { setKeyboardStatus } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const useKeyboardStatus = () => {
    const dispatch = useAppDispatch();

    const onChange = (bool: boolean) => {
        dispatch(setKeyboardStatus(bool));
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                onChange(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                onChange(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
};

export default useKeyboardStatus;
