import { Entorno } from '../simbolos/entorno';
import { tipos, tiposResta, tiposMulti, tiposPotencia } from '../Util/TablaTipos';
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

    public tipoDominanteResta(tipo1: Tipo, tipo2: Tipo): Tipo {
        return tiposResta[tipo1][tipo2];
    }

    public tipoDominanteMulti(tipo1: Tipo, tipo2: Tipo): Tipo {
        return tiposMulti[tipo1][tipo2];
    }

    public tipoDominantePotencia(tipo1: Tipo, tipo2: Tipo): Tipo {
        return tiposPotencia[tipo1][tipo2];
    }
}