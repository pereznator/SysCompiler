"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class FuncionInstruccion extends instruccion_1.Instruccion {
    constructor(id, contenido, parametros, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.contenido = contenido;
        this.parametros = parametros;
        this.tipo = tipo;
        this.tipoInstruccion = 'funcion';
    }
    ejecutar(entorno) {
        return entorno.guardarFuncion(this.id, this);
    }
}
exports.FuncionInstruccion = FuncionInstruccion;
