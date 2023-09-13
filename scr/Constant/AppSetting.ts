import { AxiosRequestConfig } from 'axios';

const apiURL = '';
const VersionNumber = '1.0.0';

const defaultAPISetting: AxiosRequestConfig = {
    baseURL: apiURL,
    timeout: 200000,
    headers: {
        'Content-Type': 'application/json',
    },
    data: undefined,
};

export default { VersionNumber, defaultAPISetting };
