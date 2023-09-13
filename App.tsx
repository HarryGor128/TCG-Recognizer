import AppContainer from './scr/AppContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-devsettings';

library.add(fab, faSquareCheck, faMugSaucer);

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <AppContainer />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;
