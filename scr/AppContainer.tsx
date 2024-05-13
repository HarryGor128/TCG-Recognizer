import { View } from 'react-native';

import AppPopup from './Components/Common/AppPopup/AppPopup';
import CustomLoader from './Components/Common/CustomLoader/CustomLoader';

import useAxiosInterceptors from './Hook/Common/useAxiosInterceptors';
import useKeyboardStatus from './Hook/Common/useKeyboardStatus';
import useNetworkError from './Hook/Common/useNetworkError';

import { useAppSelector } from './store/storeHooks';

import MainStack from './Page/Stack/MainStack';

const AppContainer = () => {
    useKeyboardStatus();

    useAxiosInterceptors();
    useNetworkError();

    const appState = useAppSelector((state) => state.appState);

    return (
        <AppPopup>
            <View style={{ flex: 1 }}>
                <MainStack />
                <CustomLoader
                    IsLoading={appState.isLoading}
                    LoaderText={appState.loaderText}
                />
            </View>
        </AppPopup>
    );
};

export default AppContainer;
