import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class Truncate extends Expresion {
    
    public tipoExpresion = 'truncate';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.valor.ejecutar(env);
        if (val.tipo !== Tipo.DOUBLE && val.tipo !== Tipo.INT) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'Truncate solo acepta valores numericos');
        }
        return {valor: Math.floor(val.valor), tipo: Tipo.INT};
    }

}