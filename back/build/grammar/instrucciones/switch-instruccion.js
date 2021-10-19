"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class SwitchInstruccion extends instruccion_1.Instruccion {
    constructor(expresion, cases, defa, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.cases = cases;
        this.defa = defa;
        this.tipoInstruccion = 'switch';
    }
    ejecutar(env) {
    }
}
exports.SwitchInstruccion = SwitchInstruccion;
