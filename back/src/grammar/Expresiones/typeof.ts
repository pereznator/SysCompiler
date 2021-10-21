import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class TypeOf extends Expresion {
    
    public tipoExpresion = 'typeof';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.valor.ejecutar(env);
        return {valor: val.tipo, tipo: Tipo.STRING};
    }

}