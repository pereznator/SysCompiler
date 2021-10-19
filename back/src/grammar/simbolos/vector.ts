import { Tipo } from '../abstractas/retorno';
export class Vector {
    tipo: Tipo;
    id: string;
    elementos: Array<any>;
    constructor(tipo: Tipo, id: string, elementos: Array<any>) {
        this.tipo = tipo;
        this.id = id;
        this.elementos = elementos;
    }
}