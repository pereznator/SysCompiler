"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const statement_1 = require("./statement");
class MetodoInstruccion extends instruccion_1.Instruccion {
    constructor(id, contenido, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.contenido = contenido;
        this.parametros = parametros;
        this.tipoInstruccion = 'metodo';
        if (contenido instanceof statement_1.Statement) {
            contenido.nombreEntorno = `Metodo ${this.id}`;
        }
    }
    ejecutar(entorno) {
        console.log('ejecutando metodo declaracion');
        entorno.getGlobal().simbolos.push({ identificador: this.id, tipoVariable: 'metodo', tipo: null, entorno: entorno.nombreEntorno, linea: this.linea, columna: this.columna });
        return entorno.guardarFuncion(this.id, this);
    }
}
exports.MetodoInstruccion = MetodoInstruccion;
