import BigWebCardCondition from './BigWebCardCondition';
import BigWebCardset from './BigWebCardset';
import BigWebGame from './BigWebGame';
import BigWebLanguage from './BigWebLanguage';
import BigWebRarity from './BigWebRarity';

class BigWebResult {
    id: number;
    name: string;
    fname: string;
    image: string;
    stock_count: number;
    description: string;
    is_sold_out: boolean;
    cardset: BigWebCardset;
    lang: number | null;
    language: BigWebLanguage | null;
    rarity: BigWebRarity;
    condition: BigWebCardCondition;
    game: BigWebGame;
    game_id: number;
    game_name: string;
    price: number;
    point: number;
    sale_prices: number;
    is_hidden_price: boolean;
    is_bargain: boolean;
    is_supply: boolean;
    is_box: boolean;
    quantity: number;
    temp_quantity: number;
    card_condition: BigWebCardCondition;
    comment: string;
    exposition: string;
    relatedItems?: BigWebResult[];

    constructor() {
        this.id = 0;
        this.name = '';
        this.fname = '';
        this.image = '';
        this.stock_count = 0;
        this.description = '';
        this.is_sold_out = false;
        this.cardset = new BigWebCardset();
        this.lang = null;
        this.language = null;
        this.rarity = new BigWebRarity();
        this.condition = new BigWebCardCondition();
        this.game = new BigWebGame();
        this.game_id = 0;
        this.game_name = '';
        this.price = 0;
        this.point = 0;
        this.sale_prices = 0;
        this.is_hidden_price = false;
        this.is_bargain = false;
        this.is_supply = false;
        this.is_box = false;
        this.quantity = 0;
        this.temp_quantity = 0;
        this.card_condition = new BigWebCardCondition();
        this.comment = '';
        this.exposition = '';
        this.relatedItems = [] as BigWebResult[];
    }
}

export default BigWebResult;
