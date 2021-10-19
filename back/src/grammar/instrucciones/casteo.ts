import { Instruccion } from '../abstractas/instruccion';
import { Tipo } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
export class Casteo extends Instruccion {
    
    public tipoInstruccion = 'casteo';

    constructor(public tipo: Tipo, private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        const val = this.expresion.ejecutar(env);
        let nuevoValor;
        if (this.tipo == Tipo.STRING) {
            nuevoValor = val.valor as string;
        }
        else if(this.tipo == Tipo.INT) {
            nuevoValor = val.valor as number;
        }
        else if(this.tipo == Tipo.DOBULE) {
            nuevoValor = val.valor as number;
        }
        else if(this.tipo == Tipo.BOOLEAN) {
            nuevoValor = val.valor as boolean;
        }
        else if(this.tipo == Tipo.CHAR) {
            nuevoValor = val.valor as string;
        }
        return nuevoValor;
    }
}