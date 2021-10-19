import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { errores } from "../Error/errores";
import { Error_ } from '../Error/error';
import { Expresion } from '../abstractas/expresion';
import { CaseInstruccion } from './case-instruccion';
import { Statement } from './statement';

export class SwitchInstruccion extends Instruccion{

    public tipoInstruccion = 'switch';

    constructor(private expresion: Expresion, private cases: Array<CaseInstruccion>, private defa: Statement, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {

    }
    
}