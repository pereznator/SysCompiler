"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const statement_1 = require("./statement");
class FuncionInstruccion extends instruccion_1.Instruccion {
    constructor(id, contenido, parametros, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.contenido = contenido;
        this.parametros = parametros;
        this.tipo = tipo;
        this.tipoInstruccion = 'funcion';
        if (contenido instanceof statement_1.Statement) {
            contenido.nombreEntorno = `Funcion ${this.id}`;
        }
    }
    ejecutar(entorno) {
        console.log('Ejecutando Fucion declaracio');
        entorno.getGlobal().simbolos.push({ identificador: this.id, tipoVariable: 'funcion', tipo: this.tipo, entorno: entorno.nombreEntorno, linea: this.linea, columna: this.columna });
        return entorno.guardarFuncion(this.id, this);
    }
}
exports.FuncionInstruccion = FuncionInstruccion;
