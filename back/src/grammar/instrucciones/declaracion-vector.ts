import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
import { Vector } from '../simbolos/vector';

export class DeclaracionVector extends Instruccion {

    public tipoInstruccion = 'declaracion vector';

    constructor(private tipo: Tipo, private id: string, private posiciones: Expresion, private elementos: Array<any>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        let arreglo = new Array();
        if (this.posiciones) {
            const exp = this.posiciones.ejecutar(env).valor as number;
            for(let i = 0; i < exp; i++) {
                arreglo.push(null);
            }
        }else {
            for (let elemento of this.elementos) {
                arreglo.push(elemento);
            }
        }
        env.guardarVector(this.id, new Vector(this.tipo, this.id, arreglo));
    }
}