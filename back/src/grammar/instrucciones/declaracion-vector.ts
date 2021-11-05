import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
import { Vector } from '../simbolos/vector';
import { Error_ } from '../Error/error';
import { Llamada } from './llamada-instruccion';

export class DeclaracionVector extends Instruccion {

    public tipoInstruccion = 'declaracion vector';

    constructor(private tipo: Tipo, private id: string, private posiciones: Expresion, private elementos: Array<Expresion>, private expresion: Expresion | Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        console.log('Ejecutando declaracion de vector');
        if (this.expresion) {
            if (!(this.expresion instanceof Llamada)) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion a vector ${this.id}`);
            }
            const val = this.expresion.ejecutar(env);
            if (val === undefined || val === null) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar indefinido a vector ${this.id}`);
            }
            if (val.tipo !== Tipo.ARRAY) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion que no sea vector a vector ${this.id}`);
            }
            if (!(val.valor instanceof Vector)) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion que no sea vector a vector ${this.id}`);
            }
            if (this.tipo !== val.valor.tipo) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos de datos para ${this.id}`);
            }
            env.guardarVector(this.id, val.valor);
            const glob = env.getGlobal()
            glob.simbolos.push({identificador: this.id, tipoVariable: 'vector', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna});
            return;
        }
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