export enum Tipo {
    STRING,
    INT,
    BOOLEAN,
    NULL,
    CHAR,
    DOBULE,
    ARRAY,
    VOID
}

export type Retorno = {
    valor: any,
    tipo: Tipo
}