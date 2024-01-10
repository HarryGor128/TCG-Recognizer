import { View } from 'react-native';

import CustomLoader from './Components/Common/CustomLoader/CustomLoader';
import TouchableKeyboardDismissView from './Components/Common/TouchableKeyboardDismissView/TouchableKeyboardDismissView';

import MainStack from './Page/Stack/MainStack';

import { useAppSelector } from './store/storeHooks';

import useKeyboardStatus from './Hook/Common/useKeyboardStatus';

const AppContainer = () => {
    useKeyboardStatus();

    const appState = useAppSelector((state) => state.appState);

    return (
        <View style={{ flex: 1 }}>
            <TouchableKeyboardDismissView>
                <MainStack />
                <CustomLoader
                    IsLoading={appState.isLoading}
                    LoaderText={appState.loaderText}
                />
            </TouchableKeyboardDismissView>
        </View>
    );
};

export default AppContainer;
