import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface appState {
    isLoading: boolean;
    isKeyboardShow: boolean;
    loaderText: string;
    isLogin: boolean;
}

// Define the initial state using that type
const initialState: appState = {
    isLoading: false,
    isKeyboardShow: false,
    loaderText: '',
    isLogin: false,
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        openLoader: (state) => {
            state.isLoading = true;
        },

        closeLoader: (state) => {
            state.isLoading = false;
        },

        setLoaderState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setLoaderText: (state, action: PayloadAction<string>) => {
            state.loaderText = action.payload;
        },

        setKeyboardStatus: (state, action: PayloadAction<boolean>) => {
            state.isKeyboardShow = action.payload;
        },

        userLogin: (state) => {
            state.isLogin = true;
        },

        userLogout: (state) => {
            state.isLogin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    openLoader,
    closeLoader,
    setLoaderState,
    setLoaderText,
    setKeyboardStatus,
    userLogin,
    userLogout,
} = appStateSlice.actions;

export default appStateSlice.reducer;
