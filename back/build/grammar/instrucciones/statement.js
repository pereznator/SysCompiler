"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const errores_1 = require("../Error/errores");
class Statement extends instruccion_1.Instruccion {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    ejecutar(env) {
        const newEnv = new entorno_1.Entorno(env);
        for (const instr of this.code) {
            try {
                const element = instr.ejecutar(newEnv);
                if (element != undefined && element != null) {
                    return element;
                }
            }
            catch (error) {
                const err = error;
                errores_1.errores.push(err);
            }
        }
    }
}
exports.Statement = Statement;
