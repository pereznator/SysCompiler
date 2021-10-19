import { Entorno } from '../simbolos/entorno';
import { tipos } from '../Util/TablaTipos';
import { Retorno, Tipo } from './retorno';

export abstract class Expresion {
    public linea: number;
    public columna: number;
    constructor(linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    public abstract ejecutar(entorno: Entorno) : Retorno;

    public tipoDominante(tipo1 : Tipo, tipo2 : Tipo) : Tipo{
        const type = tipos[tipo1][tipo2];
        return type;
    }
}