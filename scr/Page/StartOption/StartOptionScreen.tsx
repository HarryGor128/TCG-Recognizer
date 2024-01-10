import { StyleSheet, View } from 'react-native';

import CustomButton from '../../Components/Common/CustomButton/CustomButton';

const StartOptionScreen = () => {
    const onPressScanning = () => {};

    const onPressAR = () => {};

    return (
        <View style={StartOptionScreenStyles.mainContainer}>
            <CustomButton
                OnPressCallback={onPressScanning}
                ButtonText={'Scanning'}
                Icon={['fas', 'expand']}
            />
            <CustomButton
                OnPressCallback={onPressAR}
                ButtonText={'AR View'}
                Icon={['fas', 'vr-cardboard']}
                Disabled
            />
        </View>
    );
};

export default StartOptionScreen;

const StartOptionScreenStyles = StyleSheet.create({
    mainContainer: { flex: 1 },
});
