import { createStackNavigator } from '@react-navigation/stack';
import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import InitializationScreen from '../Initialization/Initialization';
import ScanningScreen from '../Scanning/ScanningScreen';

const Stack = createStackNavigator<ScreenParamList>();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Initialization'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={'Initialization'}
                component={InitializationScreen}
            />
            <Stack.Screen name={'Scanning'} component={ScanningScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;