import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
export class DeclaracionVector extends Instruccion {

    constructor(private tipo: Tipo, private id: string, private posiciones: Expresion, private elementos: Array<any>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        
    }
}