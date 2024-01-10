import { StyleSheet, Text, View } from 'react-native';

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
            {LeftStack && !HeaderLeft && LeftStack}
            <Text
                style={[
                    styles.HeaderTitleText,
                    HeaderBold && { fontWeight: 'bold' },
                    HeaderTextColor !== undefined && { color: HeaderTextColor },
                    HeaderTextSize !== 0 && { fontSize: HeaderTextSize },
                ]}
            >
                {Title}
            </Text>
            {RightStack && !HeaderRight && RightStack}
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
    },

    HeaderTitleText: {
        flex: 1,
        maxWidth: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
        // fontSize:
    },
});
