import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './scr/AppContainer';
import './scr/i18n/i18n';
import { store } from './scr/store/store';

library.add(fab, far, fas);

const App = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <AppContainer />
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
};

export default App;
