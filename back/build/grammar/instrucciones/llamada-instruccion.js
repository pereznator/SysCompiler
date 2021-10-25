"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const error_1 = require("../Error/error");
class Llamada extends instruccion_1.Instruccion {
    constructor(id, expresiones, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
        this.tipoInstruccion = 'llamada';
    }
    ejecutar(entorno) {
        console.log('ejecutando llamada');
        const func = entorno.getFuncion(this.id);
        if (func != undefined) {
            const newEnv = new entorno_1.Entorno(entorno.getGlobal());
            if (func.parametros.length !== this.expresiones.length) {
                console.log('No coincide el numero de parametros en la llamada');
                throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No coincide el numero de parametros para la funcion ${this.id}`);
            }
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].ejecutar(entorno);
                if (func.parametros[i].tipo !== value.tipo) {
                    throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`);
                }
                newEnv.guardar(func.parametros[i].id, value.valor, value.tipo);
            }
            func.contenido.ejecutar(newEnv);
        }
        else {
            console.log('No se encontro el metodo');
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No se encontro metodo con id ${this.id}`);
        }
    }
}
exports.Llamada = Llamada;
