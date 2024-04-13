import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';

const TextInputComponent = ({
    style,
    autoCapitalize,
    placeholderTextColor,
    autoCorrect,
    allowFontScaling,
    ...props
}: TextInputProps) => {
    return (
        <TextInput
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
            autoCorrect={autoCorrect ? autoCorrect : false}
            allowFontScaling={allowFontScaling ? allowFontScaling : false}
            style={[TextComponentStyles.defaultStyle, style]}
            placeholderTextColor={
                placeholderTextColor
                    ? placeholderTextColor
                    : ColorConstant.Text.Black.Normal
            }
            {...props}
        />
    );
};

export default TextInputComponent;

const TextComponentStyles = StyleSheet.create({
    defaultStyle: {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Black.Normal,
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Normal,
    },
});
