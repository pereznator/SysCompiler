export enum Tipo {
    INT,
    DOUBLE,
    STRING,
    CHAR,
    BOOLEAN,
    ARRAY,
    NULL,
}

export type Retorno = {
    valor: any,
    tipo: Tipo
}