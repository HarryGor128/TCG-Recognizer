import { Text } from 'react-native';
import 'react-native-devsettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './scr/AppContainer';
import { store } from './scr/store/store';

library.add(fab, far, fas);

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

const App = () => {
    (Text as unknown as TextWithDefaultProps).defaultProps =
        (Text as unknown as TextWithDefaultProps).defaultProps || {};
    (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
        false;

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
