import { Alert } from 'react-native';

import axios, { AxiosError } from 'axios';

import ApiSetting from '../../Constant/ApiSetting';
import { closeLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const useAxiosInterceptors = () => {
    const dispatch = useAppDispatch();

    axios.create(ApiSetting.axiosSetting);

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            Alert.alert('Error', error.message);
            dispatch(closeLoader());
            return Promise.resolve(error);
        },
    );
};

export default useAxiosInterceptors;
