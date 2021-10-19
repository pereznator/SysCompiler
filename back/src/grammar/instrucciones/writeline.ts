import { Instruccion } from '../abstractas/instruccion';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';

export class WriteLine extends Instruccion {

    public tipoInstruccion = 'writeline';

    constructor(private expresion: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        const exp = this.expresion.ejecutar(env);
        console.log(exp);
    }
}