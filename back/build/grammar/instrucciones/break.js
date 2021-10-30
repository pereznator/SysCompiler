"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
        this.tipoInstruccion = 'break';
    }
    ejecutar(env) {
        console.log('Ejecutando break');
        return this;
    }
}
exports.Break = Break;
