export interface IRoot {
    questions: IQuestion[];
}

export interface IQuestion {
    meta: IMeta;
    format: string[];
    answers: string[][];
}

export interface IMeta {
    title: string;
    type: string;
    instruction: string;
}
