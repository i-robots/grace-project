export type Article = {
    _id: string;
    ops: Op[];
    title: string;
};

export type Op = {
    insert: string | { [key: string]: any };
    attributes?: {
        [key: string]: any;
    };
};