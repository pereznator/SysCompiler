"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class Return extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoInstruccion = 'return';
        this.retorno = { valor: 0, tipo: 0 };
    }
    ejecutar(env) {
        console.log('Ejecutando return');
        if (this.expresion) {
            this.retorno = this.expresion.ejecutar(env);
        }
        return this;
    }
}
exports.Return = Return;
