import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';

export class Break extends Instruccion {
    public tipoInstruccion = 'break';
    constructor(linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        console.log('Ejecutando break');
        return this;
    }
}