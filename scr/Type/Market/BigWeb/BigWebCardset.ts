class BigWebCardset {
    id: number;
    web: string;
    slip: string;
    type: number;
    ordering_id: number;
    desc: string;
    cardset_id: number;
    code: string;
    is_reservation: boolean;
    is_box: boolean;
    rack_number: null | string;
    rack_ordering: number;
    picking_type: number;
    release: null;

    constructor() {
        this.id = 0;
        this.web = '';
        this.slip = '';
        this.type = 0;
        this.ordering_id = 0;
        this.desc = '';
        this.cardset_id = 0;
        this.code = '';
        this.is_reservation = false;
        this.is_box = false;
        this.rack_number = '';
        this.rack_ordering = 0;
        this.picking_type = 0;
        this.release = null;
    }
}

export default BigWebCardset;
