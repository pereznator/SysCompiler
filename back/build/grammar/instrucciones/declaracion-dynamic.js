"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const dynamicList_1 = require("../simbolos/dynamicList");
class DeclaracionDynamic extends instruccion_1.Instruccion {
    constructor(tipo, id, chararray, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.chararray = chararray;
        this.tipoInstruccion = 'declaracion dynamic';
    }
    ejecutar(env) {
        if (this.chararray) {
            const arr = this.chararray.ejecutar(env).valor;
            env.guardarVector(this.id, new dynamicList_1.DynamicList(this.tipo, this.id, arr));
        }
        else {
            env.guardarVector(this.id, new dynamicList_1.DynamicList(this.tipo, this.id, new Array()));
        }
    }
}
exports.DeclaracionDynamic = DeclaracionDynamic;
