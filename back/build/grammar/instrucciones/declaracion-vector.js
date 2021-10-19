"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class DeclaracionVector extends instruccion_1.Instruccion {
    constructor(tipo, id, posiciones, elementos, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.posiciones = posiciones;
        this.elementos = elementos;
    }
    ejecutar(env) {
    }
}
exports.DeclaracionVector = DeclaracionVector;
