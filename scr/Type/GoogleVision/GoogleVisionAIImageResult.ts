export default class GoogleVisionAIImageResult {
    responses: Response[];

    constructor() {
        this.responses = [] as Response[];
    }
}

export interface Response {
    webDetection: WebDetection;
}

export interface WebDetection {
    webEntities: WebEntity[];
    fullMatchingImages: Image[];
    partialMatchingImages: Image[];
    pagesWithMatchingImages: PagesWithMatchingImage[];
    visuallySimilarImages: Image[];
    bestGuessLabels: BestGuessLabel[];
}

export interface BestGuessLabel {
    label: string;
    languageCode: string;
}

export interface Image {
    url: string;
}

export interface PagesWithMatchingImage {
    url: string;
    pageTitle: string;
    partialMatchingImages: Image[];
}

export interface WebEntity {
    entityId: string;
    score: number;
    description?: string;
}
