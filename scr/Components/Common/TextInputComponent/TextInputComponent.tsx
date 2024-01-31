import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';

const TextInputComponent = ({ style, ...props }: TextInputProps) => {
    return (
        <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            allowFontScaling={false}
            style={[TextComponentStyles.defaultStyle, style]}
            {...props}
        />
    );
};

export default TextInputComponent;

const TextComponentStyles = StyleSheet.create({
    defaultStyle: {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Blue.Deep,
        textAlignVertical: 'center',
    },
});
