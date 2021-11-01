"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const vector_1 = require("../simbolos/vector");
const error_1 = require("../Error/error");
class DeclaracionVector extends instruccion_1.Instruccion {
    constructor(tipo, id, posiciones, elementos, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.posiciones = posiciones;
        this.elementos = elementos;
        this.tipoInstruccion = 'declaracion vector';
    }
    ejecutar(env) {
        console.log('Ejecutando declaracion de vector');
        let arreglo = new Array();
        if (this.posiciones) {
            let exp = this.posiciones.ejecutar(env);
            if (exp.tipo !== retorno_1.Tipo.INT) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede crear vector '${this.id}' porque debe tener un numero entero de posiciones.`);
            }
            for (let i = 0; i < exp.valor; i++) {
                arreglo.push(null);
            }
        }
        else if (this.elementos) {
            for (let elemento of this.elementos) {
                const el = elemento.ejecutar(env);
                if (el.tipo !== this.tipo) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `El valor del elemento ${el.valor} no coincide con el tipo de vector ${this.id}.`);
                }
                arreglo.push(el);
            }
        }
        env.guardarVector(this.id, new vector_1.Vector(this.tipo, this.id, arreglo));
        const glob = env.getGlobal();
        glob.simbolos.push({ identificador: this.id, tipoVariable: 'vector', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna });
    }
}
exports.DeclaracionVector = DeclaracionVector;
