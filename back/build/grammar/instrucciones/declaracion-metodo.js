"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class MetodoInstruccion extends instruccion_1.Instruccion {
    constructor(id, contenido, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.contenido = contenido;
        this.parametros = parametros;
        this.tipoInstruccion = 'metodo';
    }
    ejecutar(entorno) {
        //return entorno.guardarFuncion(this.id, this);
    }
}
exports.MetodoInstruccion = MetodoInstruccion;
