"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
class Llamada extends instruccion_1.Instruccion {
    constructor(id, expresiones, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
        this.tipoInstruccion = 'llamada';
    }
    ejecutar(entorno) {
        const func = entorno.getFuncion(this.id);
        if (func != undefined) {
            const newEnv = new entorno_1.Entorno(entorno.getGlobal());
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].ejecutar(entorno);
                newEnv.guardar(func.parametros[i], value.valor, value.tipo);
            }
            func.contenido.ejecutar(newEnv);
        }
    }
}
exports.Llamada = Llamada;
