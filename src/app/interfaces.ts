export interface DocumentPage {
    number: number;
    imageUrl: string;
    annotations: Annotation[];
}

export interface Annotation {
    type: 'text' | 'image';
    content: string;
    x: number;
    y: number;
    editing: boolean;
}
