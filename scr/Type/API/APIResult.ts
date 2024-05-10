class APIResult {
    result: boolean;
    msg?: string;
    data?: any;

    constructor() {
        this.result = true;
        this.msg = '';
        this.data = {};
    }
}

export default APIResult;
