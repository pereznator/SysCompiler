"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Casteo extends instruccion_1.Instruccion {
    constructor(tipo, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.expresion = expresion;
        this.tipoInstruccion = 'casteo';
    }
    ejecutar(env) {
        console.log('Ejecutando casteo');
        const val = this.expresion.ejecutar(env);
        console.log(`tipo esperado ${this.tipo} y tipo cambiando ${val.tipo}`);
        if (val.tipo === this.tipo) {
            return val;
        }
        if (this.tipo === retorno_1.Tipo.INT && val.tipo === retorno_1.Tipo.DOUBLE) {
            return { valor: Math.floor(val.valor), tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.DOUBLE && val.tipo === retorno_1.Tipo.INT) {
            return { valor: parseFloat(val.valor), tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.STRING && val.tipo === retorno_1.Tipo.INT) {
            return { valor: `${val.valor}`, tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.CHAR && val.tipo === retorno_1.Tipo.INT) {
            return { valor: String.fromCharCode(val.valor), tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.STRING && val.tipo === retorno_1.Tipo.DOUBLE) {
            return { valor: `${val.valor}`, tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.INT && val.tipo === retorno_1.Tipo.CHAR) {
            return { valor: val.valor.charCodeAt(0), tipo: this.tipo };
        }
        else if (this.tipo === retorno_1.Tipo.DOUBLE && val.tipo === retorno_1.Tipo.CHAR) {
            return { valor: parseFloat(val.valor.charCodeAt(0)), tipo: this.tipo };
        }
        else {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se pudo convertir tiop ${val.tipo} a ${this.tipo}`);
        }
    }
}
exports.Casteo = Casteo;
