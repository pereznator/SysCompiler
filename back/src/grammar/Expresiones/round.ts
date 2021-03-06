import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class Round extends Expresion {
    
    public tipoExpresion = 'round';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando round');
        const val = this.valor.ejecutar(env);
        if (val.tipo !== Tipo.DOUBLE && val.tipo !== Tipo.INT) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'Round solo acepta valores numericos');
        }
        return {valor: Math.round(val.valor), tipo: Tipo.INT};
    }

}