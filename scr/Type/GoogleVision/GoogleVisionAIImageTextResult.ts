export default class GoogleVisionAIImageTextResult {
    responses: Response[];

    constructor() {
        this.responses = [] as Response[];
    }
}

export interface Response {
    textAnnotations: TextAnnotation[];
    fullTextAnnotation: FullTextAnnotation;
}

export interface FullTextAnnotation {
    pages: Page[];
    text: string;
}

export interface Page {
    property: WordProperty;
    width: number;
    height: number;
    blocks: Block[];
}

export interface Block {
    boundingBox: Bounding;
    paragraphs: Paragraph[];
    blockType: BlockType;
}

export enum BlockType {
    Text = 'TEXT',
}

export interface Bounding {
    vertices: Vertex[];
}

export interface Vertex {
    x: number;
    y: number;
}

export interface Paragraph {
    boundingBox: Bounding;
    words: Word[];
}

export interface Word {
    property?: WordProperty;
    boundingBox: Bounding;
    symbols: Symbol[];
}

export interface WordProperty {
    detectedLanguages: DetectedLanguage[];
}

export interface DetectedLanguage {
    languageCode: Locale;
    confidence: number;
}

export enum Locale {
    En = 'en',
    Ja = 'ja',
}

export interface Symbol {
    boundingBox: Bounding;
    text: string;
    property?: SymbolProperty;
}

export interface SymbolProperty {
    detectedBreak: DetectedBreak;
}

export interface DetectedBreak {
    type: Type;
}

export enum Type {
    Hyphen = 'HYPHEN',
    LineBreak = 'LINE_BREAK',
    Space = 'SPACE',
}

export interface TextAnnotation {
    locale?: Locale;
    description: string;
    boundingPoly: Bounding;
}
