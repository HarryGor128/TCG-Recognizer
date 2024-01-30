import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import IconConstant from '../../../Constant/IconConstant';
import TextComponent from '../TextComponent/TextComponent';

export interface CustomButtonProps {
    OnPressCallback: Function; // Trigger function callback when press button
    ButtonText?: string; // Button display text
    Disabled?: boolean; // Is button disable
    Icon?: IconProp; // Button display icon (using FontAwesomeIcon, need pass IconProp object from '@fortawesome/fontawesome-svg-core')
    IconSize?: number; // Icon size
    IconColor?: string; // Icon color
    IconOnRight?: boolean; // Icon display in left or right
    ContainerStyle?: StyleProp<ViewStyle>; // Container style
    ButtonContainerStyle?: StyleProp<ViewStyle>; // Button style
    ButtonTextStyle?: StyleProp<TextStyle>; // Button text style
}

const IconRenderer = (props: CustomButtonProps) => {
    const { Icon, IconSize, Disabled, IconColor } = props;

    return (
        <>
            {Icon && (
                <FontAwesomeIcon
                    icon={Icon}
                    size={IconSize ? IconSize : IconConstant.DefaultIconSize}
                    color={
                        Disabled
                            ? ColorConstant.Text.Grey.Dark
                            : IconColor
                            ? IconColor
                            : ColorConstant.Text.Blue.Deep
                    }
                />
            )}
        </>
    );
};

/**
 * @param OnPressCallback: Function; // Trigger function callback when press button
 * @param ButtonText?: string; // Button display text
 * @param Disabled?: boolean; // Is button disable
 * @param Icon?: IconProp; // Button display icon (using FontAwesomeIcon, need pass IconProp object from '@fortawesome/fontawesome-svg-core')
 * @param IconSize?: number; // Icon size
 * @param IconColor?: string; // Icon color
 * @param IconOnRight?: boolean; // Icon display in left or right
 * @param ContainerStyle?: StyleProp<ViewStyle>; // Container style
 * @param ButtonContainerStyle?: StyleProp<ViewStyle>; // Button style
 * @param ButtonTextStyle?: StyleProp<TextStyle>; // Button text style
 */
const CustomButton = (props: CustomButtonProps) => {
    const OnPressButton = () => {
        props.OnPressCallback();
    };

    const {
        ButtonText,
        Disabled,
        IconOnRight,
        ContainerStyle,
        ButtonContainerStyle,
        ButtonTextStyle,
    } = props;

    return (
        <View style={[ButtonStyle.MainContainer, ContainerStyle]}>
            <TouchableOpacity
                style={[
                    ButtonStyle.ButtonContainer,
                    {
                        backgroundColor: Disabled
                            ? ColorConstant.BG.Grey.Normal
                            : ColorConstant.BG.Blue.Bright,
                    },
                    ButtonContainerStyle,
                ]}
                onPress={() => OnPressButton()}
                disabled={Disabled}
            >
                <View style={ButtonStyle.ContentContainer}>
                    {!IconOnRight && <IconRenderer {...props} />}
                    {ButtonText && (
                        <TextComponent
                            style={[
                                ButtonStyle.ButtonText,
                                {
                                    color: Disabled
                                        ? ColorConstant.Text.Grey.Dark
                                        : ColorConstant.Text.Blue.Deep,
                                },
                                ButtonTextStyle,
                            ]}
                        >
                            {ButtonText}
                        </TextComponent>
                    )}
                    {IconOnRight && <IconRenderer {...props} />}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;

const ButtonStyle = StyleSheet.create({
    MainContainer: {},

    ButtonContainer: {
        borderRadius: 15,
        padding: 15,
    },

    ContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonText: {
        fontSize: FontSizeConstant.middle,
        marginHorizontal: 10,
    },
});
