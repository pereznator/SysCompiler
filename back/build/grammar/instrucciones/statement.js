"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const errores_1 = require("../Error/errores");
const return_1 = require("./return");
class Statement extends instruccion_1.Instruccion {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
        this.nombreEntorno = '';
    }
    ejecutar(env) {
        const newEnv = new entorno_1.Entorno(env);
        newEnv.nombreEntorno = this.nombreEntorno;
        for (const instr of this.code) {
            try {
                const element = instr.ejecutar(newEnv);
                if (element != undefined && element != null) {
                    if (element instanceof return_1.Return) {
                        console.log('se encontro un retorno en el statement');
                        return element.retorno;
                    }
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
