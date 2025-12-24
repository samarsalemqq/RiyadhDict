export type DictionaryItem={
    word?: string;
    lemma?:string;
    definition?: string;
    definitions?:string[];
    meanings?: string[];
};

export type DictionaryResponse ={
    results?:DictionaryItem[];
    data?:{
        results?:DictionaryItem[];

    };
}