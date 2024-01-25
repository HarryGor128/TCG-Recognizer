import axios from 'axios';
import HTMLParser from 'node-html-parser';

import YuyuteiCard from '../Type/Market/Yuyutei/YuyuteiCard';
import YuyuteiResult from '../Type/Market/Yuyutei/YuyuteiResult';
import commonService from './Common/commonService';

const MarketService = {
    async YuyuteiSearch(cardName: string): Promise<YuyuteiResult[]> {
        try {
            const result = await axios.get(
                `https://yuyu-tei.jp/sell/ygo/s/search?search_word=${cardName}&rare=&type=&kizu=1`,
            );
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

                    data.CardList.push(cardData);
                });

                covertData.push(data);
            });

            console.log('🚀 ~ rareList.forEach ~ covertData:', covertData);
            return Promise.resolve(covertData);
        } catch (error: any) {
            return Promise.resolve([] as YuyuteiResult[]);
        }
    },
};

export default MarketService;
