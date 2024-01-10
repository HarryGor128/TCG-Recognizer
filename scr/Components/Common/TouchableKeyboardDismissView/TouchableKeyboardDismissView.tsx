import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    children: React.ReactNode; // Display object
}

/**
 * @param children: React.ReactNode; // Display object
 */
const TouchableKeyboardDismissView = ({ children }: Props) => {
    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            {children}
        </TouchableWithoutFeedback>
    );
};

export default TouchableKeyboardDismissView;
