import { ActivityIndicator, StyleSheet, View } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import TextComponent from '../TextComponent/TextComponent';

export interface CustomLoaderProps {
    IsLoading: boolean;
    LoaderText?: string;
}

const CustomLoader = ({ IsLoading, LoaderText }: CustomLoaderProps) => {
    return (
        <>
            {IsLoading && (
                <View style={styles.MainContainer}>
                    <ActivityIndicator animating={IsLoading} size={'large'} />
                    <TextComponent style={styles.LoadingText}>
                        {LoaderText ? LoaderText : 'Loading'}
                    </TextComponent>
                </View>
            )}
        </>
    );
};

export default CustomLoader;

const styles = StyleSheet.create({
    MainContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstant.Transparent.Black,
    },

    LoadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: FontSizeConstant.xlarge,
        color: ColorConstant.Text.White.Normal,
        backgroundColor: ColorConstant.Transparent.Black,
        paddingHorizontal: 5,
        margin: 10,
    },
});
