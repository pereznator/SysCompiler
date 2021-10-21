import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class GetValue extends Expresion {
    
    public tipoExpresion = 'getvalue';

    constructor(private id: string, private posicion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.posicion.ejecutar(env);
        const dym = env.getDynamicList(this.id);
        if (dym) {
            const final = dym.elementos[val.valor];
            return {tipo: dym.tipo, valor: final}
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
    }

}