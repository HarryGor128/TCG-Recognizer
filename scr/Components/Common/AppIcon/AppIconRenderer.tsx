import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    FontAwesomeIcon,
    FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';

import ColorConstant from '../../../Constant/ColorConstant';

export interface AppIconProps {
    Icon: IconProp; // Display Icon
    IconSize?: number; // Icon size
    IconColor?: string; // Icon Color
    IconStyle?: FontAwesomeIconStyle; // Icon style
}

/**
 *
 * @param Icon: IconProp; // Display Icon
 * @param IconSize?: number; // Icon size
 * @param IconColor?: string; // Icon Color
 * @param IconStyle?: FontAwesomeIconStyle; // Icon style
 */
const AppIcon = ({ Icon, IconSize, IconColor, IconStyle }: AppIconProps) => {
    return (
        <FontAwesomeIcon
            icon={Icon}
            size={IconSize}
            color={IconColor ? IconColor : ColorConstant.Text.Blue.Light}
            style={IconStyle}
        />
    );
};

export default AppIcon;
