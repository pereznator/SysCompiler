"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class Continue extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
        this.tipoInstruccion = 'continue';
    }
    ejecutar(env) {
        return this;
    }
}
exports.Continue = Continue;
