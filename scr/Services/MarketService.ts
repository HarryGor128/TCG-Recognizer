import axios from 'axios';
import HTMLParser from 'node-html-parser';

import BigWebResult from '../Type/Market/BigWeb/BigWebResult';
import YuyuteiCard from '../Type/Market/Yuyutei/YuyuteiCard';
import YuyuteiResult from '../Type/Market/Yuyutei/YuyuteiResult';
import commonService from './Common/commonService';

const MarketService = {
    async getCurrencyExchangeRate(
        foreign: string,
        to: string = 'hkd',
    ): Promise<number> {
        try {
            const result = await axios.get(
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${foreign}/${to}.json`,
            );
            console.log(
                '🚀 ~ file: MarketService.ts:15 ~ getCurrencyExchange ~ result:',
                result.data,
            );

            return result.data[to];
        } catch (error: any) {
            console.log(
                '🚀 ~ file: MarketService.ts:19 ~ getCurrencyExchange ~ error:',
                error,
            );
            return Promise.resolve(0);
        }
    },

    async YuyuteiSearch(cardName: string): Promise<YuyuteiResult[]> {
        try {
            const result = await axios.get(
                `https://yuyu-tei.jp/sell/ygo/s/search?search_word=${cardName}&rare=&type=&kizu=1`,
            );

            // HTML convert to data object
            const resultHTML = HTMLParser.parse(result.data);
            const rareList = resultHTML.querySelectorAll('#card-list3');
            const covertData: YuyuteiResult[] = [];
            rareList.forEach((rareRow) => {
                let data = new YuyuteiResult();
                data.Rare = rareRow.getElementsByTagName('span')[0].textContent;

                const cardList = rareRow.querySelector('#card-lits'); // Find each rare card list
                const cardListItem = cardList?.querySelectorAll('.col-md'); // Covert list to array

                cardListItem?.forEach((item) => {
                    let cardData = new YuyuteiCard();

                    cardData.cardName =
                        item.getElementsByTagName('h4')[0].textContent;

                    const image = item
                        .getElementsByTagName('img')[1]
                        .getAttribute('src');
                    cardData.cardImage = image ? image : '';

                    const price =
                        item.getElementsByTagName('strong')[0].textContent;
                    cardData.price = commonService.stringToFloat(price);

                    const url = item
                        .getElementsByTagName('a')[0]
                        .getAttribute('href');
                    cardData.url = url ? url : '';

                    data.CardList.push(cardData);
                });

                covertData.push(data);
            });

            console.log(
                '🚀 ~ file: MarketService.ts:52 ~ YuyuteiSearch ~ covertData:',
                covertData,
            );
            return Promise.resolve(covertData);
        } catch (error: any) {
            return Promise.resolve([] as YuyuteiResult[]);
        }
    },

    async BigWebSearch(cardName: string): Promise<BigWebResult[]> {
        try {
            const bigWebResult = await axios.get(
                `https://api.bigweb.co.jp/products?game_id=9&name=${cardName}&is_supply=0&is_purchase=0`,
            );
            console.log(
                '🚀 ~ file: MarketService.ts:63 ~ BigWebSearch ~ bigWebResult:',
                bigWebResult.data.items,
            );

            return Promise.resolve(bigWebResult.data.items);
        } catch (error: any) {
            return Promise.resolve([] as BigWebResult[]);
        }
    },
};

export default MarketService;
