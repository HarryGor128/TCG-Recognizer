class MarketResultItem {
    cardName: string;
    image: string;
    price: number;

    constructor() {
        this.cardName = '';
        this.image = '';
        this.price = 0;
    }
}

class MarketResultList {
    header: string;
    item: MarketResultItem[];

    constructor() {
        this.header = '';
        this.item = [] as MarketResultItem[];
    }
}

export default MarketResultList;
