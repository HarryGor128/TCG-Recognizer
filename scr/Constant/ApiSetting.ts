import { AxiosRequestConfig } from 'axios';

import googleAPIKey from './googleAPIKey';

const googleApiKey = googleAPIKey;

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
