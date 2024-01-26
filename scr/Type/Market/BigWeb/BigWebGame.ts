class BigWebGame {
    id: number;
    web: string;
    slip: string;
    code: string;
    update_date: string;
    type_genre_id: number;
    order_no: number;
    ordering_id: number;
    is_hide: boolean;
    buying_ordering_id: number;
    is_buying_hide: boolean;
    is_list_buying: boolean;
    is_bulk_buying: boolean;
    image_url: string;
    comment: string;
    name: string;
    name_encode: string;

    constructor() {
        this.id = 0;
        this.web = '';
        this.slip = '';
        this.code = '';
        this.update_date = '';
        this.type_genre_id = 0;
        this.order_no = 0;
        this.ordering_id = 0;
        this.is_hide = false;
        this.buying_ordering_id = 0;
        this.is_buying_hide = false;
        this.is_list_buying = false;
        this.is_bulk_buying = false;
        this.image_url = '';
        this.comment = '';
        this.name = '';
        this.name_encode = '';
    }
}

export default BigWebGame;
