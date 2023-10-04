import 'react-native-devsettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './scr/AppContainer';
import { store } from './scr/store/store';

library.add(fab, faSquareCheck, faMugSaucer);

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
