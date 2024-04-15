import axios from 'axios';

import YGOCardList from '../Type/CardList/YGOCardList';

const CardListService = {
    async searchCardInfoByName(name: string): Promise<YGOCardList[]> {
        try {
            const result = await axios.get(
                `https://ygocdb.com/api/v0/?search=${name}`,
            );
            console.log(
                '🚀 ~ file: CardListService.ts:9 ~ searchCardInfoByName ~ result:',
                result.data.result,
            );

            return Promise.resolve(result.data.result);
        } catch (error: any) {
            console.log(
                '🚀 ~ file: CardListService.ts:16 ~ searchCardInfoByName ~ error:',
                error,
            );
            return Promise.resolve([] as YGOCardList[]);
        }
    },
};

export default CardListService;
