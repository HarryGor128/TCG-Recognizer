import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';
import TextInputComponent from '../TextInputComponent/TextInputComponent';

interface SearchBarProps {
    onInput: Function; // When user input on the search bar
    value: string; // The value of text input
    placeHolderText?: string; // Display search bar place holder
    placeHolderTextColor?: string; // Place holder text color
    Icon?: AppIconProps; // Set icon props
    containerStyle?: StyleProp<ViewStyle>; // Container style
    inputStyle?: StyleProp<TextStyle>; // Text input style
}

const SearchBar = ({
    onInput,
    placeHolderText,
    placeHolderTextColor,
    Icon,
    containerStyle,
    inputStyle,
    value,
}: SearchBarProps) => {
    return (
        <View style={[SearchBarStyles.inputContainer, containerStyle]}>
            <AppIcon
                Icon={['fas', 'search']}
                IconColor={ColorConstant.Text.Blue.Deep}
                IconSize={20}
                {...Icon}
            />
            <TextInputComponent
                style={[SearchBarStyles.textInput, inputStyle]}
                placeholder={placeHolderText ? placeHolderText : 'Search'}
                placeholderTextColor={
                    placeHolderTextColor
                        ? placeHolderTextColor
                        : ColorConstant.Text.Grey.Dark
                }
                onChangeText={(text) => {
                    onInput(text);
                }}
                value={value}
            />
        </View>
    );
};

export default SearchBar;

const SearchBarStyles = StyleSheet.create({
    inputContainer: {
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    textInput: {
        flex: 1,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Deep,
    },
});
