import axios from 'axios';

import ApiSetting from '../Constant/ApiSetting';
import GoogleVisionAIImageResult from '../Type/GoogleVision/GoogleVisionAIImageResult';
import GoogleVisionAIImageTextResult from '../Type/GoogleVision/GoogleVisionAIImageTextResult';
import ImageSearchRequestsObject from '../Type/GoogleVision/ImageSearchRequestsObject';

const GoogleVisionService = {
    async VisionImageSearch(
        imgBase64: string,
    ): Promise<GoogleVisionAIImageResult> {
        try {
            const data: ImageSearchRequestsObject = {
                requests: [
                    {
                        image: { content: imgBase64 },
                        features: [
                            {
                                type: 'WEB_DETECTION',
                            },
                        ],
                    },
                ],
            };

            const result = await axios.post(
                `https://vision.googleapis.com/v1/images:annotate?key=${ApiSetting.googleApiKey}`,
                data,
            );
            console.log(
                '🚀 ~ file: GoogleVisionService.ts:27 ~ VisionImageSearch ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error: any) {
            console.log(
                '🚀 ~ file: GoogleVisionService.ts:7 ~ VisionImageSearch ~ error:',
                error,
            );
            return Promise.resolve(new GoogleVisionAIImageResult());
        }
    },

    async VisionImageTextSearch(
        imgBase64: string,
    ): Promise<GoogleVisionAIImageTextResult> {
        try {
            const data: ImageSearchRequestsObject = {
                requests: [
                    {
                        image: { content: imgBase64 },
                        features: [
                            {
                                type: 'TEXT_DETECTION',
                            },
                        ],
                    },
                ],
            };

            const result = await axios.post(
                `https://vision.googleapis.com/v1/images:annotate?key=${ApiSetting.googleApiKey}`,
                data,
            );
            console.log(
                '🚀 ~ file: GoogleVisionService.ts:65 ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error: any) {
            console.log(
                '🚀 ~ file: GoogleVisionService.ts:7 ~ VisionImageSearch ~ error:',
                error,
            );
            return Promise.resolve(new GoogleVisionAIImageTextResult());
        }
    },
};

export default GoogleVisionService;
