import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';

export class Continue extends Instruccion {
    public tipoInstruccion = 'continue';
    constructor(linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        return this;
    }
}