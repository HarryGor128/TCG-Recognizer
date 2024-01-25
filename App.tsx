import { StyleProp, Text, TextStyle } from 'react-native';
import 'react-native-devsettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './scr/AppContainer';
import ColorConstant from './scr/Constant/ColorConstant';
import FontSizeConstant from './scr/Constant/FontSizeConstant';
import { store } from './scr/store/store';

library.add(fab, far, fas);

interface TextWithDefaultProps extends Text {
    defaultProps?: {
        allowFontScaling?: boolean;
        style?: StyleProp<TextStyle>;
    };
}

const App = () => {
    (Text as unknown as TextWithDefaultProps).defaultProps =
        (Text as unknown as TextWithDefaultProps).defaultProps || {};
    (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
        false;
    (Text as unknown as TextWithDefaultProps).defaultProps!.style = {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Blue.Deep,
    };

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
