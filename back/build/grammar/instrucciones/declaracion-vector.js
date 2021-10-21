"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const vector_1 = require("../simbolos/vector");
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
        let arreglo = new Array();
        if (this.posiciones) {
            const exp = this.posiciones.ejecutar(env).valor;
            for (let i = 0; i < exp; i++) {
                arreglo.push(null);
            }
        }
        else {
            for (let elemento of this.elementos) {
                arreglo.push(elemento);
            }
        }
        env.guardarVector(this.id, new vector_1.Vector(this.tipo, this.id, arreglo));
    }
}
exports.DeclaracionVector = DeclaracionVector;
