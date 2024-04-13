import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';
import TextComponent from '../TextComponent/TextComponent';

export interface CheckBoxProps {
    isCheck: boolean;
    onPressCheckBox: Function;
    disable?: boolean;
    checkBoxText?: string;
    textIcon?: AppIconProps;
    checkIcon?: AppIconProps;
    checkBoxStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const CheckBox = ({
    isCheck,
    onPressCheckBox,
    disable,
    checkBoxText,
    textIcon,
    checkIcon,
    checkBoxStyle,
    containerStyle,
    textStyle,
}: CheckBoxProps) => {
    const onPress = () => {
        onPressCheckBox();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
            style={[CheckBoxStyles.mainContainer, containerStyle]}
        >
            <View
                style={[
                    CheckBoxStyles.checkContainer,
                    {
                        width: checkIcon ? checkIcon.IconSize + 10 : 35,
                        height: checkIcon ? checkIcon.IconSize + 10 : 35,
                    },
                    checkBoxStyle,
                ]}
            >
                {isCheck && (
                    <AppIcon
                        Icon={checkIcon ? checkIcon.Icon : ['fas', 'check']}
                        IconColor={
                            checkIcon
                                ? checkIcon.IconColor
                                : ColorConstant.BG.Black.Normal
                        }
                        IconSize={checkIcon ? checkIcon.IconSize : 25}
                        IconStyle={checkIcon ? checkIcon.IconStyle : undefined}
                    />
                )}
            </View>
            {textIcon && <AppIcon {...textIcon} />}
            {checkBoxText && (
                <TextComponent style={[CheckBoxStyles.text, textStyle]}>
                    {checkBoxText}
                </TextComponent>
            )}
        </TouchableOpacity>
    );
};

export default CheckBox;

const CheckBoxStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: ColorConstant.BG.Black.Normal,
    },

    text: {
        marginLeft: 5,
    },
});
