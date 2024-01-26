class BigWebCardCondition {
    id: number;
    web: string;
    slip: string;
    type: number;
    ordering_id: number;
    name?: string;

    constructor() {
        this.id = 0;
        this.web = '';
        this.slip = '';
        this.type = 0;
        this.ordering_id = 0;
        this.name = '';
    }
}

export default BigWebCardCondition;
