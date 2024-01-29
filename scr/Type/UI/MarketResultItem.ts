class MarketResultItem {
    cardName: string;
    image: string;
    price: number;
    cur: string;
    webUrl: string;

    constructor() {
        this.cardName = '';
        this.image = '';
        this.price = 0;
        this.cur = '';
        this.webUrl = '';
    }
}

export default MarketResultItem;
