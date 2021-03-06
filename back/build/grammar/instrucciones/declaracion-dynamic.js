"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const dynamicList_1 = require("../simbolos/dynamicList");
const error_1 = require("../Error/error");
class DeclaracionDynamic extends instruccion_1.Instruccion {
    constructor(tipo, tipo2, id, chararray, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.id = id;
        this.chararray = chararray;
        this.tipoInstruccion = 'declaracion dynamic';
    }
    ejecutar(env) {
        console.log('Ejecutando declaracion dynamic');
        if (this.tipo2) {
            if (this.tipo !== this.tipo2)
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos para la lista '${this.id}'`);
        }
        if (env.getDynamicList(this.id) !== null && env.getDynamicList(this.id) !== undefined) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Ya existe una variable con id '${this.id}'`);
        }
        if (this.chararray) {
            if (this.tipo !== retorno_1.Tipo.CHAR) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar arreglo de caracteres a tipo ${this.tipo}`);
            }
            const arr = this.chararray.ejecutar(env);
            if (arr.tipo !== retorno_1.Tipo.ARRAY) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${arr.tipo} a lista '${this.id}'`);
            }
            env.guardarDynamicList(this.id, new dynamicList_1.DynamicList(this.tipo, this.id, arr.valor));
        }
        else {
            env.guardarDynamicList(this.id, new dynamicList_1.DynamicList(this.tipo, this.id, new Array()));
        }
        const glob = env.getGlobal();
        glob.simbolos.push({ identificador: this.id, tipoVariable: 'lista', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna });
    }
}
exports.DeclaracionDynamic = DeclaracionDynamic;
