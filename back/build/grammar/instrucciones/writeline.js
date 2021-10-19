"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class WriteLine extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoInstruccion = 'writeline';
    }
    ejecutar(env) {
        const exp = this.expresion.ejecutar(env);
        console.log(exp);
    }
}
exports.WriteLine = WriteLine;
