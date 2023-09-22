import { View } from 'react-native';

import CustomLoader from './Components/CustomLoader/CustomLoader';

import MainStack from './Page/Stack/MainStack';

import { useAppSelector } from './store/storeHooks';

const AppContainer = () => {
    const appState = useAppSelector((state) => state.appState);

    return (
        <View style={{ flex: 1 }}>
            <MainStack />
            <CustomLoader
                IsLoading={appState.isLoading}
                LoaderText={appState.loaderText}
            />
        </View>
    );
};

export default AppContainer;
