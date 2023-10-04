export default class ImageSearchRequestsObject {
    requests: Request[];

    constructor() {
        this.requests = [] as Request[];
    }
}

export interface Request {
    image: Image;
    features: Feature[];
}

export interface Feature {
    type: string;
}

export interface Image {
    content: string;
}
