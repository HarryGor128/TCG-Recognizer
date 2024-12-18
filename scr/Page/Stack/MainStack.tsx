import { createStackNavigator } from '@react-navigation/stack';

import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import ARViewScreen from '../ARView/ARView';
import CardListScreen from '../CardList/CardListScreen';
import ChatRoomScreen from '../ChatRoom/ChatRoomScreen';
import GoogleResultScreen from '../GoogleResult/GoogleResultScreen';
import InitializationScreen from '../Initialization/Initialization';
import MarketResult from '../MarketResult/MarketResult';
import StartOptionScreen from '../StartOption/StartOptionScreen';

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
            <Stack.Screen name={'StartOption'} component={StartOptionScreen} />
            <Stack.Screen
                name={'GoogleResult'}
                component={GoogleResultScreen}
            />
            <Stack.Screen name={'MarketResult'} component={MarketResult} />
            <Stack.Screen name={'ARView'} component={ARViewScreen} />
            <Stack.Screen name={'CardList'} component={CardListScreen} />
            <Stack.Screen name={'ChatRoom'} component={ChatRoomScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
