import MarketResultItem from './MarketResultItem';

class MarketResultList {
    title: string;
    data: MarketResultItem[];

    constructor() {
        this.title = '';
        this.data = [] as MarketResultItem[];
    }
}

export default MarketResultList;
