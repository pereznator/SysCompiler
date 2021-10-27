import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class Length extends Expresion {
    
    public tipoExpresion = 'length';

    constructor(private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando length');
        const val = this.expresion.ejecutar(env);
        if (val.tipo === Tipo.STRING) {
            return {valor: val.valor.length, tipo: Tipo.INT};
        }else if (val.tipo === Tipo.ARRAY) {
            return {valor: val.valor.elementos.length, tipo: Tipo.INT};
        }
        throw new Error_(this.linea, this.columna, 'Sintactico', 'No se puede encontrar la longitud de '+val.valor);
    }

}