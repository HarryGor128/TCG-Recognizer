import { AxiosRequestConfig } from 'axios';

const googleApiKey = 'AIzaSyA_gTcwhBP7S7xH4i_6AB9sxpWAQshAKAU';

const apiURL = '';

const axiosSetting: AxiosRequestConfig = {
    // baseURL: apiURL,
    timeout: 5000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    data: undefined,
};

const ApiSetting = { googleApiKey, axiosSetting };

export default ApiSetting;
