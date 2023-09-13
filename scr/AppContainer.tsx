import { View } from 'react-native';
import MainStack from './Page/Stack/MainStack';
import useCustomLoader from './Components/CustomLoader/useCustomLoader';
import CustomLoader from './Components/CustomLoader/CustomLoader';

const AppContainer = () => {
    const { IsLoading, LoaderText } = useCustomLoader();

    return (
        <View style={{ flex: 1 }}>
            <MainStack />
            <CustomLoader IsLoading={IsLoading} LoaderText={LoaderText} />
        </View>
    );
};

export default AppContainer;
