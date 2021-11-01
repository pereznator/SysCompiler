"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const errores_1 = require("../Error/errores");
class CaseInstruccion extends instruccion_1.Instruccion {
    constructor(condicion, code, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.code = code;
        this.tipoInstruccion = 'case';
    }
    ejecutar(env, expresion) {
        console.log('Ejecutando case');
        const val = this.condicion.ejecutar(env);
        if (val.valor !== expresion.valor) {
            return;
        }
        const newEnv = new entorno_1.Entorno(env);
        newEnv.nombreEntorno = 'instruccion switch';
        for (const instr of this.code) {
            try {
                const element = instr.ejecutar(newEnv);
                if (element != undefined || element != null) {
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
exports.CaseInstruccion = CaseInstruccion;
