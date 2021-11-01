import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
import { Vector } from '../simbolos/vector';
import { Error_ } from '../Error/error';

export class DeclaracionVector extends Instruccion {

    public tipoInstruccion = 'declaracion vector';

    constructor(private tipo: Tipo, private id: string, private posiciones: Expresion, private elementos: Array<Expresion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        console.log('Ejecutando declaracion de vector');
        let arreglo = new Array();
        if (this.posiciones) {
            let exp = this.posiciones.ejecutar(env);
            if (exp.tipo !== Tipo.INT) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede crear vector '${this.id}' porque debe tener un numero entero de posiciones.`);
            }
            for(let i = 0; i < exp.valor; i++) {
                arreglo.push(null);
            }
        }else if (this.elementos) {
            for (let elemento of this.elementos) {
                const el = elemento.ejecutar(env);
                if (el.tipo !== this.tipo) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `El valor del elemento ${el.valor} no coincide con el tipo de vector ${this.id}.`)
                }
                arreglo.push(el);
            }
        }
        env.guardarVector(this.id, new Vector(this.tipo, this.id, arreglo));
        const glob = env.getGlobal()
        glob.simbolos.push({identificador: this.id, tipoVariable: 'vector', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna});
    }
}