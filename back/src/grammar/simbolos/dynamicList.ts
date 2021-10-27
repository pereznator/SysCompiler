import { Tipo, Retorno } from '../abstractas/retorno';

export class DynamicList {
    tipo: Tipo;
    id: string;
    elementos: Array<Retorno>;
    constructor(tipo: Tipo, id: string, elementos: Array<Retorno>) {
        this.tipo = tipo;
        this.id = id;
        this.elementos = elementos;
    }
}