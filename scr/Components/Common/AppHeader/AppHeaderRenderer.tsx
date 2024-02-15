import { StyleSheet, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import TextComponent from '../TextComponent/TextComponent';

interface AppHeaderProps {
    LeftStack?: React.ReactNode; // Header left element
    RightStack?: React.ReactNode; // Header right element
    Title?: string; // Header title text
    BackgroundColor?: string; // Header color
    HeaderTextColor?: string; // Header text color
    HeaderTextSize?: number; // Header text size
    HeaderBold?: boolean; // Header title text bold
    HeaderLeft?: boolean; // Header disable left stack
    HeaderRight?: boolean; // Header disable right stack
}

/**
 *
 *  @param LeftStack?: React.ReactNode; // Header left element
 *  @param RightStack?: React.ReactNode; // Header right element
 *  @param Title?: string; // Header title text
 *  @param BackgroundColor?: string; // Header color
 *  @param HeaderTextColor?: string; // Header text color
 *  @param HeaderTextSize?: number; // Header text size
 *  @param HeaderBold?: boolean; // Header title text bold
 *  @param HeaderLeft?: boolean; // Header disable left stack
 *  @param HeaderRight?: boolean; // Header disable right stack
 */
const AppHeader = ({
    LeftStack,
    RightStack,
    Title,
    BackgroundColor,
    HeaderTextColor,
    HeaderTextSize,
    HeaderBold,
    HeaderLeft,
    HeaderRight,
}: AppHeaderProps) => {
    return (
        <View
            style={[
                styles.AppHeaderContainer,
                BackgroundColor !== undefined && {
                    backgroundColor: BackgroundColor,
                },
            ]}
        >
            <View style={styles.LeftStackContainer}>
                {LeftStack && !HeaderLeft && LeftStack}
            </View>
            <View style={styles.HeaderTitleContainer}>
                <TextComponent
                    style={[
                        styles.HeaderTitleText,
                        HeaderBold && { fontWeight: 'bold' },
                        HeaderTextColor !== undefined && {
                            color: HeaderTextColor,
                        },
                        HeaderTextSize !== undefined && {
                            fontSize: HeaderTextSize,
                        },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {Title}
                </TextComponent>
            </View>
            <View style={styles.RightStackContainer}>
                {RightStack && !HeaderRight && RightStack}
            </View>
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    AppHeaderContainer: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstant.BG.Blue.Dark,
    },

    HeaderTitleContainer: {
        flex: 1,
        marginHorizontal: 10,
        maxWidth: '50%',
        justifyContent: 'center',
    },

    HeaderTitleText: {
        flex: 1,
        fontSize: FontSizeConstant.large,
        color: ColorConstant.Text.White.Normal,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    LeftStackContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'flex-start',
    },

    RightStackContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'flex-end',
    },
});
