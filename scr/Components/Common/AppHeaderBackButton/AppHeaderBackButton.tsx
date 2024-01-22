import { NavigationProp } from '@react-navigation/native';

import ScreenParamList from '../../../Type/Navigation/ScreenParamList';
import CustomButton from '../CustomButton/CustomButton';

interface AppHeaderBackButtonProps {
    navigation: NavigationProp<ScreenParamList>; // Navigation Prop
    beforeGoBack?: Function; // Before page going back
    backToOtherPage?: Function; // Back to other page
}

/**
 *
 *  @param navigation: NavigationProp<ScreenParamList>; // Navigation Prop
 *  @param beforeGoBack?: Function; // Before page going back
 *  @param backToOtherPage?: Function; // Back to other page
 */
const AppHeaderBackButton = ({
    navigation,
    beforeGoBack,
    backToOtherPage,
}: AppHeaderBackButtonProps) => {
    const OnPressBack = () => {
        if (beforeGoBack) {
            beforeGoBack();
        }

        if (backToOtherPage) {
            backToOtherPage();
        } else {
            navigation.goBack();
        }
    };

    return (
        <CustomButton
            OnPressCallback={OnPressBack}
            ButtonText={''}
            Icon={['fas', 'chevron-left']}
            IconSize={30}
        />
    );
};

export default AppHeaderBackButton;
