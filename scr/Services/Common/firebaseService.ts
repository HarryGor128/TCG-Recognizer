import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import CollectionPath from '../../Constant/CollectionPath';
import RemoteFilePath from '../../Constant/RemoteFilePath';
import APIResult from '../../Type/API/APIResult';
import FirebaseRealTimeMsg from '../../Type/API/FirebaseRealTimeMsg';
import UploadFile from '../../Type/Common/UploadFile';

const firebaseService = {
    async getDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<APIResult> {
        try {
            const result = await firestore()
                .collection(collectionPath)
                .doc(docId)
                .get();
            console.log('🚀 ~ file: firebaseService.ts:13 ~ result:', result);

            return Promise.resolve({ result: true, data: result.data() });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:18 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async getCollection(
        collectionPath: CollectionPath,
        orderKey?: string,
        isDescending?: boolean,
    ): Promise<APIResult> {
        try {
            const colRef = orderKey
                ? firestore()
                      .collection(collectionPath)
                      .orderBy(orderKey, isDescending ? 'desc' : 'asc')
                : firestore().collection(collectionPath);
            const result = await colRef.get();

            let data: any[] = [];
            result.forEach((item) => {
                data.push(item.data());
            });
            console.log(
                '🚀 ~ file: firebaseService.ts:32 ~ result.forEach ~ data:',
                data,
            );

            return Promise.resolve({ result: true, data });
        } catch (error: any) {
            console.log(
                '🚀 ~ file: firebaseService.ts:39 ~ getCollection ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async addDocWithHash(
        collectionPath: CollectionPath,
        setObj: any,
        uidField: string,
        id?: string,
    ): Promise<APIResult> {
        try {
            const newDocRef = await firestore()
                .collection(collectionPath)
                .doc();

            const newId = id ? id : newDocRef.id;

            const result = await newDocRef.set({
                ...setObj,
                [uidField]: newId,
            });
            console.log('🚀 ~ file: firebaseService.ts:64 ~ result:', result);

            return Promise.resolve({
                result: true,
                data: result,
            });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:71 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async addDocByID(
        collectionPath: CollectionPath,
        id: string,
        setObj: any,
    ): Promise<APIResult> {
        try {
            const newDocRef = await firestore()
                .collection(collectionPath)
                .doc(id);
            console.log(
                '🚀 ~ file: firebaseService.ts:97 ~ newDocRef:',
                newDocRef,
            );

            const result = await newDocRef.set(setObj);
            console.log('🚀 ~ file: firebaseService.ts:103 ~ result:', result);

            return Promise.resolve({
                result: true,
                data: result,
            });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:108 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async updateDoc(
        collectionPath: CollectionPath,
        id: string,
        setObj: any,
    ): Promise<APIResult> {
        try {
            const result = await firestore()
                .collection(collectionPath)
                .doc(id)
                .update(setObj);
            console.log('🚀 ~ file: firebaseService.ts:83 ~ result:', result);

            return Promise.resolve({ result: true, data: result });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:90 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async deleteDoc(
        collectionPath: CollectionPath,
        id: string,
    ): Promise<APIResult> {
        try {
            const result = await firestore()
                .collection(collectionPath)
                .doc(id)
                .delete();
            console.log('🚀 ~ file: firebaseService.ts:104 ~ result:', result);

            return Promise.resolve({ result: true, data: result });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:111 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    async uploadFile(
        remoteFilePath: RemoteFilePath,
        uploadFile: UploadFile,
    ): Promise<APIResult> {
        try {
            const refPath = `${remoteFilePath}/${uploadFile.fileName}.${uploadFile.fileType}`;
            const storageRef = await storage().ref(refPath);
            await storageRef.putFile(uploadFile.uploadFilePath);
            const fileUrl = await storageRef.getDownloadURL();
            console.log(
                '🚀 ~ file: firebaseService.ts:125 ~ fileUrl:',
                fileUrl,
            );

            return Promise.resolve({ result: true, data: fileUrl });
        } catch (error: any) {
            console.log('🚀 ~ file: firebaseService.ts:129 ~ error:', error);
            return Promise.resolve({ result: false, msg: error.toString() });
        }
    },

    getCollectionRealtimeUpdate(
        collectionPath: CollectionPath,
        onResult: (data: any) => void,
        onError: (error: Error) => void,
    ): APIResult {
        try {
            let initialLoad = true;
            const result = firestore()
                .collection(collectionPath)
                .onSnapshot((documentSnapshot) => {
                    documentSnapshot.docChanges().forEach((change) => {
                        if (initialLoad) {
                            return;
                        }
                        const updateData: FirebaseRealTimeMsg = {
                            changeType: change.type,
                            data: change.doc.data() as any,
                        };
                        onResult(updateData);
                    });
                    initialLoad = false;
                }, onError);
            return { result: true, data: result };
        } catch (error: any) {
            return { result: false, msg: error.toString() };
        }
    },
};

export default firebaseService;
