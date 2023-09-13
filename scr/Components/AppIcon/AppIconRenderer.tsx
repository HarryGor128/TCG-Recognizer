import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    FontAwesomeIcon,
    FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';

export interface AppIconProps {
    Icon: IconProp; // Display Icon
    IconSize?: number; // Icon size
    IconColor?: string; // Icon Color
    IconStyle?: FontAwesomeIconStyle; // Icon style
}

const AppIcon = ({ Icon, IconSize, IconColor, IconStyle }: AppIconProps) => {
    return (
        <FontAwesomeIcon
            icon={Icon}
            size={IconSize}
            color={IconColor}
            style={IconStyle}
        />
    );
};

export default AppIcon;
