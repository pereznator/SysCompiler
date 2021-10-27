"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../Error/error");
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
class SetValue extends instruccion_1.Instruccion {
    constructor(id, posicion, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.valor = valor;
        this.tipoInstruccion = 'setvalue';
    }
    ejecutar(env) {
        console.log('Ejecutando setvalue');
        const dym = env.getDynamicList(this.id);
        if (!dym) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
        }
        const pos = this.posicion.ejecutar(env);
        if (pos.tipo !== retorno_1.Tipo.INT) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Se necesita un numero entero para acceder a una posicion de la lista '${this.id}'`);
        }
        if (pos.valor > dym.elementos.length - 1 || pos.valor < 0) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${pos.valor} en la lista '${this.id}'`);
        }
        const valor = this.valor.ejecutar(env);
        if (valor.tipo !== dym.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${pos.tipo} a la lista '${this.id}'`);
        }
        dym.elementos[pos.valor] = valor;
    }
}
exports.SetValue = SetValue;
