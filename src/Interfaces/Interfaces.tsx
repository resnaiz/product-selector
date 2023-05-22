export interface Items {
    code: string;
    description: string;
    varieties: string[];
}

export interface Options {
    code: string;
    description: string;
}

export interface Variety {
    code: string;
    description: string;
    options: Options[];
}