import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import 'intl-pluralrules';

import AppContainer from './scr/AppContainer';
import ColorConstant from './scr/Constant/ColorConstant';
import './scr/i18n/i18n';
import { store } from './scr/store/store';

library.add(fab, far, fas);

// LogBox.ignoreAllLogs();

const App = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: ColorConstant.BG.Blue.Deep,
                        }}
                    >
                        <AppContainer />
                    </SafeAreaView>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
};

export default App;
