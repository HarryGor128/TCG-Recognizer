class Data {
    ot: number;
    setcode: number;
    type: number;
    atk: number;
    def: number;
    level: number;
    race: number;
    attribute: number;

    constructor() {
        this.ot = 0;
        this.setcode = 0;
        this.type = 0;
        this.atk = 0;
        this.def = 0;
        this.level = 0;
        this.race = 0;
        this.attribute = 0;
    }
}

class HTML {
    pdesc: string;
    desc: string;
    refer: { [key: string]: boolean };

    constructor() {
        this.pdesc = '';
        this.desc = '';
        this.refer = {};
    }
}

class Text {
    types: string;
    pdesc: string;
    desc: string;

    constructor() {
        this.types = '';
        this.pdesc = '';
        this.desc = '';
    }
}

class YGOCardList {
    cid: number;
    id: number;
    cn_name: string;
    sc_name: string;
    md_name: string;
    nwbbs_n: string;
    cnocg_n: string;
    jp_ruby: string;
    jp_name: string;
    en_name: string;
    text: Text;
    data: Data;
    html: HTML;
    weight: number;
    faqs: string[];
    artid: number;

    constructor() {
        this.cid = 0;
        this.id = 0;
        this.cn_name = '';
        this.sc_name = '';
        this.md_name = '';
        this.nwbbs_n = '';
        this.cnocg_n = '';
        this.jp_ruby = '';
        this.jp_name = '';
        this.en_name = '';
        this.text = new Text();
        this.data = new Data();
        this.html = new HTML();
        this.weight = 0;
        this.faqs = [];
        this.artid = 0;
    }
}

export default YGOCardList;
