import { View } from 'react-native';

import AppPopup from './Components/Common/AppPopup/AppPopup';
import CustomLoader from './Components/Common/CustomLoader/CustomLoader';
import TouchableKeyboardDismissView from './Components/Common/TouchableKeyboardDismissView/TouchableKeyboardDismissView';

import MainStack from './Page/Stack/MainStack';

import { useAppSelector } from './store/storeHooks';

import useAxiosInterceptors from './Hook/Common/useAxiosInterceptors';
import useKeyboardStatus from './Hook/Common/useKeyboardStatus';

const AppContainer = () => {
    useKeyboardStatus();

    useAxiosInterceptors();

    const appState = useAppSelector((state) => state.appState);

    return (
        <TouchableKeyboardDismissView>
            <AppPopup>
                <View style={{ flex: 1 }}>
                    <MainStack />
                    <CustomLoader
                        IsLoading={appState.isLoading}
                        LoaderText={appState.loaderText}
                    />
                </View>
            </AppPopup>
        </TouchableKeyboardDismissView>
    );
};

export default AppContainer;
