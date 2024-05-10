import auth from '@react-native-firebase/auth';

import APIResult from '../../Type/API/APIResult';

const firebaseAuthService = {
    async anonymousLogin(): Promise<APIResult> {
        try {
            const result = await auth().signInAnonymously();
            console.log(
                '🚀 ~ file: firebaseAuthService.ts:9 ~ anonymousLogin ~ result:',
                result,
            );
            return Promise.resolve({ result: true, data: result });
        } catch (error: any) {
            console.log(
                '🚀 ~ file: firebaseAuthService.ts:15 ~ anonymousLogin ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },
};

export default firebaseAuthService;
