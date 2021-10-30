import { Entorno } from '../simbolos/entorno';
import { Retorno } from './retorno';

export abstract class Instruccion {
    public linea: number;
    public columna: number;
    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    public abstract ejecutar(entorno: Entorno, expresion?: Retorno): any;
}