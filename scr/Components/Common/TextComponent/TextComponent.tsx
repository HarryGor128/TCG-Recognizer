import { StyleSheet, Text, TextProps } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';

const TextComponent = ({ style, ...props }: TextProps) => {
    return (
        <Text
            style={[CustomTextStyles.defaultStyle, style]}
            allowFontScaling={false}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export default TextComponent;

const CustomTextStyles = StyleSheet.create({
    defaultStyle: {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Blue.Deep,
    },
});
