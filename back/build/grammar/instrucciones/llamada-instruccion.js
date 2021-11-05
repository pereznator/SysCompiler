"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const error_1 = require("../Error/error");
const funcion_instruccion_1 = require("./funcion-instruccion");
const statement_1 = require("./statement");
const retorno_1 = require("../abstractas/retorno");
const declaracion_dynamic_1 = require("./declaracion-dynamic");
const declaracion_vector_1 = require("./declaracion-vector");
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
                if (value.tipo == retorno_1.Tipo.ARRAY && (func.parametros[i] instanceof declaracion_dynamic_1.DeclaracionDynamic || func.parametros[i] instanceof declaracion_vector_1.DeclaracionVector)) {
                    if (value.valor.tipo !== func.parametros[i].tipo) {
                        throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`);
                    }
                    if (func.parametros[i] instanceof declaracion_dynamic_1.DeclaracionDynamic) {
                        newEnv.guardarDynamicList(func.parametros[i].id, value.valor);
                    }
                    else {
                        newEnv.guardarVector(func.parametros[i].id, value.valor);
                    }
                }
                else {
                    if (func.parametros[i].tipo !== value.tipo) {
                        throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`);
                    }
                    newEnv.guardar(func.parametros[i].id, value.valor, value.tipo);
                }
                let global = entorno.getGlobal();
                if (func.contenido instanceof statement_1.Statement) {
                    global.simbolos.push({ identificador: func.parametros[i].id, tipoVariable: 'variable', tipo: value.tipo, entorno: func.contenido.nombreEntorno, linea: func.parametros[i].linea, columna: func.parametros[i].columna });
                }
            }
            let res = func.contenido.ejecutar(newEnv);
            if (!res && func instanceof funcion_instruccion_1.FuncionInstruccion) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La funcion '${this.id}' debe retornar un valor tipo ${func.tipo}.`);
            }
            if (func instanceof funcion_instruccion_1.FuncionInstruccion) {
                if (res.tipo !== func.tipo) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Tipo ${res.tipo} no es valido para retornar en la funcion '${func.id}'`);
                }
            }
            return res;
        }
        else {
            console.log('No se encontro el metodo');
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No se encontro metodo con id ${this.id}`);
        }
    }
}
exports.Llamada = Llamada;
