import YuyuteiCard from './YuyuteiCard';

class YuyuteiResult {
    Rare: string;
    CardList: YuyuteiCard[];

    constructor() {
        this.Rare = '';
        this.CardList = [] as YuyuteiCard[];
    }
}

export default YuyuteiResult;
